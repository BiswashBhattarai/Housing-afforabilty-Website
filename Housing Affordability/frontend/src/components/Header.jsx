import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <h3 className="brand">Iowa City Housing</h3>
        <nav aria-label="Main navigation">
          <a href="#">Home</a>
          <a href="#neighborhoods">Neighborhoods</a>
          <a href="#resources">Resources</a>
        </nav>
      </div>
    </header>
  )
}
