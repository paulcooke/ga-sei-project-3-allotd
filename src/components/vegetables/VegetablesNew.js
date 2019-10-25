import React from 'react'
import VegetablesForm from './VegetablesForm'
import axios from 'axios'

import Auth from '../../lib/auth'

class VegetablesNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        title: '', // { type: String, required: true },
        typeOfVeg: '', // { type: String, required: true },
        varietyOfVeg: '', //{ type: String },
        pickedDate: 0, //{ type: Date, required: true },
        description: '', // { type: String, maxlength: 200 },
        image: '', //{ type: String },
        isClaimed: false,
        vegLocation: '' //{ type: String, required: true },
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    //make errors blank initially
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    console.log(this.state.data)
    e.preventDefault()
    axios.post('/api/vegetables', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/vegetables/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    return (
      <VegetablesForm vegetable={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default VegetablesNew