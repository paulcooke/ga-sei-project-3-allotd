import React from 'react'
import axios from 'axios'

import VegetableCard from './VegetableCard'
import { Link } from 'react-router-dom'

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
        <Link to="/vegetables/map">View on Map</Link>
        {this.state.vegetables.map(vegetable => (
          <VegetableCard key={vegetable._id} {...vegetable} />
        ))}
      </div>
    )
  }
}

export default VegetablesIndex