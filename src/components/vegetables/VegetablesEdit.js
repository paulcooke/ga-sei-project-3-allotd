import React from 'react'
import VegetablesForm from './VegetablesForm'

class VegetablesEdit extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <>
        <h1>I am the edit page. i deal with changes to the vegetable posts</h1>
        <VegetablesForm />
      </>
    )
  }
}

export default VegetablesEdit