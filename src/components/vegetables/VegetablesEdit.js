import React from 'react'
import VegetablesForm from './VegetablesForm'
import axios from 'axios'
//import moment from 'moment'

import Auth from '../../lib/auth'

class VegetablesEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        title: '', // { type: String, required: true },
        typeOfVeg: '', // { type: String, required: true },
        varietyOfVeg: '', //{ type: String },
        pickedDate: '', //{ type: Date, required: true },
        description: '', // { type: String, maxlength: 200 },
        image: '', //{ type: String },
        vegLocation: '' //{ type: String, required: true },
      },
      errors: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const vegetableId = this.props.match.params.id
    axios.get(`/api/vegetables/${vegetableId}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    //make errors blank initially
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    const vegetableId = this.props.match.params.id
    axios.put(`/api/vegetables/${vegetableId}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/vegetables/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    return (
      <VegetablesForm 
        vegetable={this.state.data} 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default VegetablesEdit