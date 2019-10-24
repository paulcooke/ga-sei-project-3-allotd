import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// auth will go here

class Navbar extends React.Component {
  constructor() {
    super()
  }


  render() {
    return (
      <nav>
        <Link to="/">Go home</Link>
        <Link to="/vegetables">Veg on offer</Link>
        
        <Link to="/register">Register</Link>        
        <Link to="/login">Sign in</Link>
      </nav>
    )
  }

}

export default withRouter(Navbar)
