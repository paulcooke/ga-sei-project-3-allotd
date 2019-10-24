import React from 'react'
import VegetableCard from './VegetableCard'
// paul - might need axios for filtery stuff



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