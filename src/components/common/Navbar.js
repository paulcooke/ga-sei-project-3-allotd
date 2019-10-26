import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import SearchForm from './SearchForm'

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
        {Auth.isAuthenticated() && <Link to="/vegetables/new">Post your veg</Link>}
        
        {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}        
        {!Auth.isAuthenticated() && <Link to="/login">Sign in</Link>}
        {Auth.isAuthenticated() && <Link to="/dashboard">Dashboard</Link>}
        {Auth.isAuthenticated() && <a onClick={this.handleLogout}>Logout</a>}
      </nav>
    )
  }
}

export default withRouter(Navbar)
