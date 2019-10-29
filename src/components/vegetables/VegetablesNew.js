import React from 'react'
import VegetablesForm from './VegetablesForm'
import axios from 'axios'

import Auth from '../../lib/auth'
import SearchForm from '../common/SearchForm'

class VegetablesNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        title: '', // { type: String, required: true },
        typeOfVeg: '', // { type: String, required: true },
        varietyOfVeg: '', //{ type: String },
        pickedDate: '', //{ type: Date, required: true },
        description: '', // { type: String, maxlength: 200 },
        image: 'HIiiiiii', //{ type: String },
        isClaimed: false,
        vegLocation: '', //{ type: String, required: true },
        availablePickUpDays: [],
        availablePickUpTimes: []
      }
    }

    this.dayOptions = [
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' },
      { value: 'Saturday', label: 'Saturday' },
      { value: 'Sunday', label: 'Sunday' }
    ]

    this.timeOptions = [
      { value: '6', label: '6:00' },
      { value: '7', label: '7:00' },
      { value: '8', label: '8:00' },
      { value: '9', label: '9:00' },
      { value: '10', label: '10:00' },
      { value: '11', label: '11:00' },
      { value: '12', label: '12:00' },
      { value: '13', label: '13:00' },
      { value: '14', label: '14:00' },
      { value: '15', label: '15:00' },
      { value: '16', label: '16:00' },
      { value: '17', label: '17:00' },
      { value: '18', label: '18:00' },
      { value: '19', label: '19:00' },
      { value: '20', label: '20:00' },
      { value: '21', label: '21:00' },
      { value: '22', label: '22:00' }
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
    const image = document.getElementById("imgurl").value
    const data = { ...this.state.data, [e.target.name]: e.target.value, image: image }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/vegetables', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/vegetables/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }  

  render() {
    console.log(this.state)
    return (
      <>
        <SearchForm />
        <VegetablesForm
          vegetable={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDaySelect={this.handleDaySelect}
          handleTimeSelect={this.handleTimeSelect}
          dayOptions={this.dayOptions}
          timeOptions={this.timeOptions}
        />
      </>
    )
  }
}

export default VegetablesNew