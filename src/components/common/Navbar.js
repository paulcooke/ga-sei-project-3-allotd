import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      burgerOpen: false
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  handleLogout() {
    Auth.logout()
    this.props.history.push('/vegetables')
  }

  toggleNavbar() {
    this.setState({ burgerOpen: !this.state.burgerOpen })
  }

  render() {
    console.log(this.state.burgerOpen)
    return (
      <nav className={`${this.state.burgerOpen ? 'burgerOpen' : ''}`}>
        <div>
          <Link to="/">Go home</Link>
          <Link to="/vegetables">Veg on offer</Link>
          {Auth.isAuthenticated() && <Link to="/vegetables/new">Post your veg</Link>}

          {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
          {!Auth.isAuthenticated() && <Link to="/login">Sign in</Link>}
          {Auth.isAuthenticated() && <Link to="/dashboard">Dashboard</Link>}
          {Auth.isAuthenticated() && <a onClick={this.handleLogout}>Logout</a>}
        </div>
        <a 
          className="burgerMenu"
          onClick={this.toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </nav>
    )
  }
}

export default withRouter(Navbar)
