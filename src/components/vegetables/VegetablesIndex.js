import React from 'react'
import axios from 'axios'

import VegetableCard from './VegetableCard'

// paul - might need axios for filtery stuff



class VegetablesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetables: null
    }
  }

  componentDidMount() {
    axios.get('/api/vegetables')
      .then(res => this.setState({ vegetables: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.vegetables) return null
    return (
      <div className='indexWrapper'>
        {this.state.vegetables.map(vegetable => (
          <VegetableCard key={vegetable.title} {...vegetable} />
        ))}
      </div>
    )
  }
}

export default VegetablesIndex