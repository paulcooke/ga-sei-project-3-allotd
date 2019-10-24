import React from 'react'
import { Link } from 'react-router-dom'
import VegetableCard from './VegetableCard'



class VegetablesIndex extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <>
        <h1>this is the index page</h1>
        <VegetableCard />
      </>
    )
  }
}

export default VegetablesIndex