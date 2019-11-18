import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
//import Creatable from 'react-select/creatable'
import CreatableSelect from 'react-select/creatable'

import Auth from '../../lib/auth'
import ImageUpload from '../images/imageUpload'

const animatedComponents = makeAnimated()

const components = {
  DropdownIndicator: null
}

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
        availablePickUpTimes: [],
        addressLineOne: '', 
        addressLineTwo: '', 
        addressCity: '', 
        addressPostcode: ''
      },
      errors: {}, 
      picture: true
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

    this.options = [
      { value: 'Tomato', label: 'Tomato' },
      { value: 'Aubergine', label: 'Aubergine' },
      { value: 'Pumpkin', label: 'Pumpkin' }, 
      { value: 'Carrots', label: 'Carrots' }, 
      { value: 'Parsnips', label: 'Parsnips' }, 
      { value: 'Garlic', label: 'Garlic' }, 
      { value: 'Onions', label: 'Onions' }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDaySelect = this.handleDaySelect.bind(this)
    this.handleTimeSelect = this.handleTimeSelect.bind(this)
    this.setStateImage = this.setStateImage.bind(this)
    this.handleMultiSelectGrown = this.handleMultiSelectGrown.bind(this)
    this.handleMultiSelectLike = this.handleMultiSelectLike.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.id
    console.log(userId)
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors  }))
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
    console.log('handle submit', this.state.data)
    const userId = this.props.match.params.id
    axios.put(`/api/profile/${userId}/edit`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  } 

  componentDidUpdate() {
    if (document.getElementById('imgurl').value && this.state.picture) return this.setStateImage()
  }

  setStateImage() {
    const image = document.getElementById('imgurl').value
    console.log('set state Dashboard Edit', image)
    const data = { ...this.state.data, userImage: image }
    this.setState({ data, picture: false })
  }

  handleMultiSelectGrown(selected) {
    console.log(selected)
    const vegGrown = selected ? selected.map( item => item.value) : []
    const data = { ...this.state.data, vegGrown }
    this.setState({ data })
    console.log(data)
  }

  handleMultiSelectLike(selected) {
    console.log(selected)
    const vegLookingFor = selected ? selected.map( item => item.value) : []
    const data = { ...this.state.data, vegLookingFor }
    this.setState({ data })
    console.log(data)
  }

  render() {
    console.log('from render Dashboard Edit', this.state)
    const { data } = this.state
    return (
      <div className='dashWrapper'>
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
            <ImageUpload />
            <input hidden id='imgurl' name="userImage" value={data.userImage} onChange={this.handleChange}/>
            <br/>
            <label>Address line 1</label>
            <input
              placeholder="Address line 1."
              name="addressLineOne"
              onChange={this.handleChange}
              value={data.addressLineOne}
            />
            <br/>
            <label>Address line 2</label>
            <input
              placeholder="Address line 2."
              name="addressLineTwo"
              onChange={this.handleChange}
              value={data.addressLineTwo}
            />
            <br/>
            <label>City or town</label>
            <input
              placeholder="City or town."
              name="addressCity"
              onChange={this.handleChange}
              value={data.addressCity}
            />
            <br/>
            <label>Postcode</label>
            <input
              placeholder="Postcode."
              name="addressPostcode"
              onChange={this.handleChange}
              value={data.addressPostcode}
            />
            <br/>
            <label>The veg you grow</label>
            <CreatableSelect
              isMulti
              onChange={this.handleMultiSelectGrown}
              components={components}
              options={this.options}
              placeholder="Select the veg you grow or type your own"
            />
            <br/>
            <label>The veg you are looking for</label>
            <CreatableSelect
              isMulti
              onChange={this.handleMultiSelectLike}
              components={components}
              options={this.options}
              placeholder="Select the veg you are looking for or type your own."
            />
            <br/>
            <label>Set your preferences for when you would like people to collect from you</label>
            <Select 
              name="availablePickUpDays"
              options={this.dayOptions}
              isMulti
              onChange={this.handleDaySelect}
              components={animatedComponents}
              value={data.availablePickUpDays && 
                data.availablePickUpDays.map(day => (
                  { value: day, label: day }
                ))
              }
            />
            <br/>
            <Select 
              options={this.timeOptions}
              isMulti
              onChange={this.handleTimeSelect}
              components={animatedComponents}
              value={data.availablePickUpTimes && 
                data.availablePickUpTimes.map(time => (
                  { value: time, label: time + ':00' }
                ))
              }
            />
            <br/>
            {!this.errors && 
            <p>Oops, something went wrong. please try again</p>}
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </section>
      </div>
    )
  }
}

export default DashboardEdit