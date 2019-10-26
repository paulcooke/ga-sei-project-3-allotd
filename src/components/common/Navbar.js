import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  constructor() {
    super()

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    Auth.logout()
    this.props.history.push('/vegetables')
  }

  render() {
    console.log(this.props)
    return (
      <nav>
        <Link to="/">Go home</Link>
        <Link to="/vegetables">Veg on offer</Link>
        <Link to="/vegetables/new">Post your veg</Link>
        
        <Link to="/register">Register</Link>        
        <Link to="/login">Sign in</Link>
        <Link to="/dashboard">Dashboard</Link>
        <a onClick={this.handleLogout}>Logout</a>
      </nav>
    )
  }
}

export default withRouter(Navbar)
