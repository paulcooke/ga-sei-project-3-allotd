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
        vegLocation: '', //{ type: String, required: true },
        availablePickUpDays: [],
        availablePickUpTimes: []
      }
    }

    this.dayOptions = [
      { value: 'mon', label: 'mon' },
      { value: 'tues', label: 'tues' },
      { value: 'weds', label: 'weds' },
      { value: 'thurs', label: 'thurs' },
      { value: 'fri', label: 'fri' },
      { value: 'sat', label: 'sat' },
      { value: 'sun', label: 'sun' }
    ]

    this.timeOptions = [
      { value: '6', label: '6am' },
      { value: '7', label: '7am' },
      { value: '8', label: '8am' },
      { value: '9', label: '9am' },
      { value: '10', label: '10am' },
      { value: '11', label: '11am' },
      { value: '12', label: 'noon' },
      { value: '13', label: '1pm' },
      { value: '14', label: '2pm' },
      { value: '15', label: '3pm' },
      { value: '16', label: '4pm' },
      { value: '17', label: '5pm' },
      { value: '18', label: '6pm' },
      { value: '19', label: '7pm' },
      { value: '20', label: '8pm' },
      { value: '21', label: '9pm' },
      { value: '22', label: '10pm' }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDaySelect = this.handleDaySelect.bind(this)
    this.handleTimeSelect = this.handleTimeSelect.bind(this)
  }

  handleDaySelect(selected) {
    const availablePickUpDays = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, availablePickUpDays: availablePickUpDays }
    this.setState({ data })
  }

  handleTimeSelect(selected) {
    const availablePickUpTimes = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, availablePickUpTimes: availablePickUpTimes }
    this.setState({ data })
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
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
      <VegetablesForm 
        vegetable={this.state} 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        handleDaySelect={this.handleDaySelect}
        handleTimeSelect={this.handleTimeSelect}
        dayOptions={this.dayOptions}
        timeOptions={this.timeOptions}
      />
    )
  }
}

export default VegetablesNew