import React from 'react'
import { Link } from 'react-router-dom'
import VegetablesShow from './VegetablesShow'



class VegetablesIndex extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <>
        <h1>this is the index page</h1>
        <Link to="/vegetables/:id">This link is for wrapping veggies in, it'll go to the show page</Link>
      </>
    )
  }
}

export default VegetablesIndex