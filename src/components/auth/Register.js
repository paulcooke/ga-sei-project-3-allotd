import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()
    
    this.state = {
      data: {
        //availablePickUpDays: [ 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat', 'sun' ], 
        //availablePickUpTimes: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ]
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/vegetables'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  render() {
    console.log('state', this.state)
    const { errors } = this.state
    return (
      <div className='formWrapper'>
        
        <form className='panelWrapper' onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          
          <label>User name</label>
          <input
            name='username'
            placeholder='username'
            onChange={this.handleChange}
          />
          {errors.username && <small>{errors.username}</small>}

          <label>Email</label>
          <input
            name='email'
            placeholder='name@email.com'
            onChange={this.handleChange}
          />
          {errors.email && <small>please enter your email</small>}

          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='password'
            onChange={this.handleChange}
          />
          {errors.password && <small>{errors.password}</small>}

          <label>Password Confirmation</label>
          <input
            name='passwordConfirmation'
            type='password'
            placeholder='password confirmation'
            onChange={this.handleChange}
          />

          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register