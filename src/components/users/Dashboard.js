import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

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
        vegGrown: [],
        vegLookingFor: [],
        rating: '',
        availablePickUpDays: [],
        availablePickUpTimes: []
      }
    }

    // this.options = [
    //   { value: 'eggs', label: 'Eggs' },
    //   { value: 'bacon', label: 'Bacon' },
    //   { value: 'coffee', label: 'Coffee' },
    //   { value: 'tea', label: 'Tea' },
    //   { value: 'beans', label: 'Beans' },
    //   { value: 'toast', label: 'Toast' },
    //   { value: 'cereal', label: 'Cereal' }
    // ]
    // bind here
  }

  componentDidMount() {
    const userId = this.props.match.params.id
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  isOwner() {
    return Auth.getPayload().sub === this.state.data._id
  }

  render() {
    console.log(this.state)
    
    return (
      <main>
        <section className='panelWrapper'>
          <div>
            <h1>Dashboard</h1>
          </div>
          <div>
            <h2>Username: {this.state.data.username}</h2>
            <h3>User Rating {this.state.data.rating}: </h3>
          </div>
          <div>
            <h2>Grown by me</h2>
            {this.state.data.vegGrown.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
          <div>
            <h2>Veggies I like</h2>
            {this.state.data.vegLookingFor.map(veg => 
              <p key={veg}>{veg}</p>
            )}
          </div>
          <div>
            <h2>My availability</h2>
            <p>
              {this.state.data.availablePickUpDays.map(day => {
                return day
              }).join(', ')}
            </p>
          </div>
          <div>
            <p>
              {this.state.data.availablePickUpTimes.map(time => {
                return time
              }).join(', ')}
            </p>
          </div>
        </section>
        <section>
          <div className='panelWrapper'>
       My Listings
          </div>
          <div className='panelWrapper'>
       My claimed veggies
          </div>
          <div className='panelWrapper'>
            {this.isOwner() &&
                <>
                  <Link to={`/dashboard/${this.state.data.id}/edit`}>
                    <button>Edit profile</button>
                  </Link>
                </>
            }
          </div>
        </section>
      </main>
    )
  }


}

export default Dashboard