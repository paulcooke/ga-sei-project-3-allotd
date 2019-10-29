import React from 'react'
import axios from 'axios'
//import moment from 'moment'

import Auth from '../../lib/auth'
import SearchForm from '../common/SearchForm'
import VegetablesForm from './VegetablesForm'

const components = {
  DropdownIndicator: null
}

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
        vegLocation: '', //{ type: String, required: true },
        availablePickUpDays: [],
        availablePickUpTimes: []
      },
      errors: {}, 
      picture: true
    }

    this.options = [
      { value: 'Tomato', label: 'Tomato' },
      { value: 'Aubergine', label: 'Aubergine' },
      { value: 'Pumpkin', label: 'Pumpkin' }, 
      { value: 'Carrots', label: 'Carrots' }, 
      { value: 'Parsnips', label: 'Parsnips' }, 
      { value: 'Garlic', label: 'Garlic' }, 
      { value: 'Onions', label: 'Onions' }
    ]

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
    this.setStateImage = this.setStateImage.bind(this)
    this.handleVegType = this.handleVegType.bind(this)
  }

  componentDidMount() {
    const vegetableId = this.props.match.params.id
    axios.get(`/api/vegetables/${vegetableId}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
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
    e.preventDefault()
    const vegetableId = this.props.match.params.id
    axios.put(`/api/vegetables/${vegetableId}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/vegetables/${res.data._id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    console.log('submit', this.state)
  }

  componentDidUpdate() {
    if (document.getElementById('imgurl').value && this.state.picture) return this.setStateImage()
  }

  setStateImage() {
    const image = document.getElementById('imgurl').value
    console.log('set state VegetablesEdit', image)
    const data = { ...this.state.data, image }
    this.setState({ data, picture: false })
  }

  handleVegType(selected) {
    console.log(selected)
    const typeOfVeg = selected.value
    const data = { ...this.state.data, typeOfVeg: typeOfVeg }
    this.setState({ data })
    console.log(data)
  }

  render() {
    console.log('render state VegetablesEdit',this.state)
    console.log('render', this.state.errors)
    return (
      <>
        <SearchForm />
        <VegetablesForm
          vegetable={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDaySelect={this.handleDaySelect}
          handleTimeSelect={this.handleTimeSelect}
          handleVegType={this.handleVegType}
          dayOptions={this.dayOptions}
          timeOptions={this.timeOptions}
          errors={this.state.errors}
          components={components}
          options={this.options}
        />
      </>
    )
  }
}

export default VegetablesEdit