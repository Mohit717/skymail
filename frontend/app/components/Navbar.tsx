import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" href="/">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./pages/widgets/widgets.html">
            <i className="icon-cog menu-icon"></i>
            <span className="menu-title">Widgets</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar