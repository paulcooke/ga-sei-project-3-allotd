import React from 'react'
import VegetablesForm from './VegetablesForm'
import axios from 'axios'

import Auth from '../../lib/auth'
import { type } from 'os'

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
        image: '', //{ type: String },
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
    e.preventDefault()
    axios.post('/api/vegetables', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/vegetables/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    // return (
    //   <>
    //     <h1>Make your veggies here! on the CREATE PAGE!!!</h1>
    //     <VegetablesForm />
    const { data: { title, typeOfVeg, varietyOfVeg, pickedDate, description, image, vegLocation } } = this.state
    return (
      <div className='formWrapper'>
        <form className='panelWrapper' onSubmit={this.handleSubmit}>
          <h2>New Vegetable</h2>
          <label>Name</label>
          <input
            placeholder="Name"
            name="title"
            onChange={this.handleChange}
            value={title}
          />
          <label>Type</label>
          <input
            placeholder="Type"
            name="typeOfVeg"
            onChange={this.handleChange}
            value={typeOfVeg}
          />
          <label>Variety</label>
          <input
            placeholder="Variety"
            name="varietyOfVeg"
            onChange={this.handleChange}
            value={varietyOfVeg}
          />
          <label>Date Picked</label>
          <input
            placeholder="Date Picked"
            name="pickedDate"
            onChange={this.handleChange}
            value={pickedDate}
          />
          <label>Image URL</label>
          <input
            placeholder='Image URL'
            name='image'
            onChange={this.handleChange}
            value={image}
          />
          <label>Location</label>
          <input
            placeholder='Postcode'
            name='vegLocation'
            onChange={this.handleChange}
            value={vegLocation}
          />
          <label>Description</label>
          <textarea
            rows='4'
            cols='5'
            type='textarea'
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <button type="submit">
            submit
          </button>
        </form>
      </div>
    )
  }
}

export default VegetablesNew