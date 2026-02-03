const express = require('express');
const router = express.Router();

// POST /api/calculate-affordability
// Expects: { annualIncome, downPayment, monthlyDebts, interestRate (optional), loanTermYears (optional) }
router.post('/', (req, res) => {
  try {
    const body = req.body || {};
    const annualIncome = Number(body.annualIncome || 0);
    const downPayment = Number(body.downPayment || 0);
    const monthlyDebts = Number(body.monthlyDebts || 0);
    const interestRate = Number(body.interestRate || process.env.DEFAULT_INTEREST_RATE || 4.0);
    const loanTermYears = Number(body.loanTermYears || process.env.DEFAULT_LOAN_TERM_YEARS || 30);

    if (!annualIncome || annualIncome <= 0) {
      return res.status(400).json({ error: 'annualIncome is required and must be > 0' });
    }

    const monthlyIncome = annualIncome / 12;

    // 28/36 rule
    const maxHousingPaymentBy28 = 0.28 * monthlyIncome;
    const maxTotalDebt = 0.36 * monthlyIncome;
    const maxHousingPaymentBy36 = Math.max(0, maxTotalDebt - monthlyDebts);

    const allowedMonthlyPayment = Math.min(maxHousingPaymentBy28, maxHousingPaymentBy36);

    // Convert interest rate to monthly decimal
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTermYears * 12;

    // Mortgage payment to principal formula: payment = r * P / (1 - (1+r)^-n)
    // Solve for P (loan amount) given allowedMonthlyPayment
    let maxLoan = 0;
    if (monthlyRate > 0) {
      const denom = monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
      maxLoan = allowedMonthlyPayment / denom;
    } else {
      maxLoan = allowedMonthlyPayment * n; // zero interest
    }

    const maxHomePrice = maxLoan + downPayment;

    // Estimate taxes and insurance: using 1.5% property tax default and a rough insurance rate
    const propertyTaxRate = 1.5; // percent
    const annualPropertyTax = (propertyTaxRate / 100) * maxHomePrice;
    const monthlyPropertyTax = annualPropertyTax / 12;
    const monthlyInsurance = Math.max(50, 0.002 * maxHomePrice / 12); // rough

    const monthlyMortgagePaymentEstimate = (maxLoan > 0 && monthlyRate > 0)
      ? (monthlyRate * maxLoan) / (1 - Math.pow(1 + monthlyRate, -n))
      : (maxLoan / n);

    const monthlyTotalEstimate = monthlyMortgagePaymentEstimate + monthlyPropertyTax + monthlyInsurance;

    res.json({
      allowedMonthlyPayment: Number(allowedMonthlyPayment.toFixed(2)),
      maxLoan: Number(maxLoan.toFixed(2)),
      maxHomePrice: Number(maxHomePrice.toFixed(2)),
      monthlyMortgagePaymentEstimate: Number(monthlyMortgagePaymentEstimate.toFixed(2)),
      monthlyPropertyTax: Number(monthlyPropertyTax.toFixed(2)),
      monthlyInsurance: Number(monthlyInsurance.toFixed(2)),
      monthlyTotalEstimate: Number(monthlyTotalEstimate.toFixed(2)),
      assumptions: {
        interestRate: Number(interestRate),
        loanTermYears: Number(loanTermYears),
        propertyTaxRate: propertyTaxRate
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate affordability' });
  }
});

module.exports = router;
