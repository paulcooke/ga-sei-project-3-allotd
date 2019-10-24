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
        
      </nav>
    )
  }

}

export default Navbar
