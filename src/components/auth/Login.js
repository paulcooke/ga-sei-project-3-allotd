import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()
    
    this.state = {
      data: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data )
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/index')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return (
      <div className='formWrapper'>
        <form className='panelWrapper' onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <label>Email</label>
          <input
            name='email'
            placeholder='name@email.com'
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='password'
            onChange={this.handleChange}
          />

          {!errors && <small>oops, something went wrong. please try again</small>}
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login