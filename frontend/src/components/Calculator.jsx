import React, { useState } from 'react'
import api from '../api'

export default function Calculator() {
  const [annualIncome, setAnnualIncome] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [monthlyDebts, setMonthlyDebts] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/calculate-affordability', {
        annualIncome: Number(annualIncome),
        downPayment: Number(downPayment),
        monthlyDebts: Number(monthlyDebts)
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      alert('Failed to calculate. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="calculator">
      <label>
        Annual Income
        <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} required />
      </label>

      <label>
        Down Payment
        <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} required />
      </label>

      <label>
        Monthly Debts
        <input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value)} />
      </label>

      <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate'}</button>

      {result && (
        <div className="result">
          <h3>Estimate</h3>
          <p>Max Home Price: ${result.maxHomePrice.toLocaleString()}</p>
          <p>Estimated Monthly Mortgage: ${result.monthlyMortgagePaymentEstimate.toLocaleString()}</p>
          <p>Monthly Property Tax: ${result.monthlyPropertyTax.toLocaleString()}</p>
          <p>Monthly Insurance: ${result.monthlyInsurance.toLocaleString()}</p>
          <p><strong>Estimated Monthly Total:</strong> ${result.monthlyTotalEstimate.toLocaleString()}</p>
        </div>
      )}
    </form>
  )
}
