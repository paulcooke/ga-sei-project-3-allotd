import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import Auth from '../../lib/auth'

const animatedComponents = makeAnimated()

class DashboardEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        userImage: '',
        userLocation: '',
        vegGrown: '', // this should be an array
        vegLookingFor: '', // this should be an array
        rating: '',
        availablePickUpDays: [],
        availablePickUpTimes: []
      },
      errors: {}
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

  componentDidMount() {
    const userId = this.props.match.params.id
    console.log(userId)
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
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

  handleSubmit(e) {
    e.preventDefault()
    const userId = this.props.match.params.id
    axios.put(`/api/profile/${userId}/edit`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    console.log(this.state)
    const { data } = this.state
    return (
      <main>
        <section className='panelWrapper'>
          <div>
            <h1>Edit your profile</h1>
          </div>
          <div>
            <label>Username</label>
            <input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
              value={data.username}
            />
            <br/>

            <label>Image url</label>
            <input
              placeholder="Add your image url address here"
              name="userImage"
              onChange={this.handleChange}
              value={data.userImage}
            />
            <br/>

            <label>Your location</label>
            <input
              placeholder="Enter your location here."
              name="userLocation"
              onChange={this.handleChange}
              value={data.userLocation}
            />
            <br/>

            <label>The veg you grow</label>
            <input
              placeholder="Enter the veg you grow here."
              name="vegGrown"
              onChange={this.handleChange}
              value={data.vegGrown}
            />
            <br/>

            <label>The veg you are looking for</label>
            <input
              placeholder="Enter the veg you want here."
              name="vegLookingFor"
              onChange={this.handleChange}
              value={data.vegLookingFor}
            />
            <br/>

            <label>Set your preferences for when you would like people to collect from you</label>
            <Select 
              name="availablePickUpDays"
              options={this.dayOptions}
              isMulti
              onChange={this.handleDaySelect}
              components={animatedComponents}
            />
            <br/>
            <Select 
              options={this.timeOptions}
              isMulti
              onChange={this.handleTimeSelect}
              components={animatedComponents}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </section>
      </main>
    )
  }

}



export default DashboardEdit