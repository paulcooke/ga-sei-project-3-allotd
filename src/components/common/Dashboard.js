import React from 'react'
import axios from 'axios'

// import axios from 'axios'

class Dashboard extends React.Component {
  constructor() {
    super()
   
    this.state = {
      data: {
        username: '',
        email: '',
        userImage: '',
        userLocation: '',
        vegGrown: '',
        vegLookingFor: '',
        rating: ''
      }
    }
    // bind here
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <h1>Hello</h1>
    )
  }


}

export default Dashboard