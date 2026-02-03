import React from 'react'

export default function NeighborhoodCard({ neighborhood }) {
  return (
    <article className="neighborhood-card" aria-labelledby={`nh-${neighborhood.id}`}>
      <h3 id={`nh-${neighborhood.id}`}>{neighborhood.name}</h3>
      <p>Median Home Price: ${neighborhood.medianHomePrice.toLocaleString()}</p>
      <p>Rent (1BR): ${neighborhood.averageRent.oneBedroom}</p>
      <p>Rent (2BR): ${neighborhood.averageRent.twoBedroom}</p>
      <p>Schools: {neighborhood.schools.join(', ')}</p>
      <p>Distance to Downtown: {neighborhood.distanceToDowntown} miles</p>
    </article>
  )
}
