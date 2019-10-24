import React from 'react'
import { Link } from 'react-router-dom'
// might need axios in here to post images to be saved somewhere?


class VegetablesShow extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <>
        <h1>showing off a veggie on the SHOW PAGE!!!</h1>
        <Link to="/vegetables/:id/edit">This link is for the edit button to the edit page</Link>
      </>
    )
  }
}

export default VegetablesShow