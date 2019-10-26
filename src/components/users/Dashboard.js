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
        availablePickUpTimes: [], 
        listingHistory: [],
        pickedVegHistory: []
      }
    }

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
            <h2>My listings</h2>
            {
              this.state.data.listingHistory.map(listing => (
                <div key={listing.id}>
                  {listing.title} on {listing.createdAt}
                </div>
              ))
            }
          </div>
          <div className='panelWrapper'>
            <h2>My pickups</h2>
            {
              this.state.data.pickedVegHistory.map(picked => (
                <div key={picked.id}>
                  {picked.vegId} (veg id)
                </div>
              ))
            }
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