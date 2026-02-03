import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Calculator from './components/Calculator'
import NeighborhoodList from './components/NeighborhoodList'
import MarketTrendsChart from './components/MarketTrendsChart'
import api from './api'

export default function App() {
  const [neighborhoods, setNeighborhoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/neighborhoods').then((res) => {
      setNeighborhoods(res.data)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <section aria-label="Overview">
          <h1>Iowa City Housing Affordability</h1>
          <p>Explore neighborhoods, compare rent vs buy, and estimate what you can afford.</p>
        </section>

        <section className="grid">
          <div className="card">
            <h2>Affordability Calculator</h2>
            <Calculator />
          </div>

          <div className="card">
            <h2>Market Trends</h2>
            <MarketTrendsChart />
          </div>
        </section>

        <section>
          <h2>Neighborhoods</h2>
          {loading ? <p>Loading...</p> : <NeighborhoodList neighborhoods={neighborhoods} />}
        </section>
      </main>
      <Footer />
    </div>
  )
}
