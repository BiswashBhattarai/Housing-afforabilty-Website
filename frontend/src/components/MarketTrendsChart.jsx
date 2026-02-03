import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import api from '../api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function MarketTrendsChart() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/market-trends').then((res) => {
      setData(res.data)
    }).catch(err => console.error(err))
  }, [])

  if (!data) return <p>Loading chart...</p>

  const labels = data.medianPriceByYear.map(p => p.year)
  const dataset = data.medianPriceByYear.map(p => p.median)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Median Home Price',
        data: dataset,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      }
    ]
  }

  return <Line data={chartData} />
}
