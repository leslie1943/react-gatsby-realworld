import React from 'react'

const Header = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="index.html">
        conduit
      </a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          {/* Add "active" class when you're on that page" */}
          <a className="nav-link active">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="ion-compose" />
            &nbsp;New Post
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="ion-gear-a" />
            &nbsp;Settings
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
