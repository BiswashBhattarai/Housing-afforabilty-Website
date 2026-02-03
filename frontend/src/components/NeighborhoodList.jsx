import React, { useState } from 'react'
import NeighborhoodCard from './NeighborhoodCard'

export default function NeighborhoodList({ neighborhoods = [] }) {
  const [filter, setFilter] = useState('')

  const filtered = neighborhoods.filter(n =>
    n.name.toLowerCase().includes(filter.toLowerCase()) || n.id.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <label>
        Search neighborhoods
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Name or id" />
      </label>

      <div className="neighborhood-grid">
        {filtered.map(n => (
          <NeighborhoodCard key={n.id} neighborhood={n} />
        ))}
      </div>
    </div>
  )
}
