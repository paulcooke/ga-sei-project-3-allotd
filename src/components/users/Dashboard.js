import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'

import SearchForm from '../common/SearchForm'


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

    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.id//why is this null when i log it?
    axios.get(`/api/profile/${userId}`, { // how is this working? LN
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  //this needs to update the appointment status in the appointment model
  handleAccept() {
    console.log('accepted')
  }

  //this needs to update the appointment status in the appointment model, possibly also deleting this but needs to update the picker, perhaps it puts them back on the schedule page
  handleReject() {
    console.log('rejected')
  }

  isOwner() {
    console.log(this.state.data._id)
    return Auth.getPayload().sub === this.state.data._id
  }

  render() {
    console.log(this.state)
    return (
      <>
        <SearchForm />
        <div className='dashWrapper'>
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
            
            {this.isOwner() &&
              <>
                <Link to={`/dashboard/${this.state.data.id}/edit`}>
                  <button>Edit profile</button>
                </Link>
              </>
            }
            
          </section>

          <section>
            <div className='panelWrapper'>
              <h2>My listings</h2>
              {
                this.state.data.listingHistory.map(listing => (
                  <div key={listing.id}>
                    <p>
                      {listing.title}, listed on {moment(listing.createdAt).format('dddd, MMMM Do')} at {moment(listing.createdAt).format('h:mm')}. 
                    </p>
                    {listing.isClaimed && 
                    <div>                      
                      <p>This veg has been CLAIMED! by CLAIMER GOES HERE. They want to collect in on APPOINTMENT DATE HERE, Would you like to accept this?</p>
                      <button onClick={this.handleAccept}>Accept</button> <button onClick={this.handleReject}>Reject</button>
                    </div>
                    }
                  </div>
                ))
              }
            </div>
            <div className='panelWrapper'>
              <h2>My pickups</h2>
              {
                this.state.data.pickedVegHistory.map(picked => (
                  <div key={picked.id}>
                    {picked.appointmentStatus === 'requested' && <span>You have requested </span>} 
                    {picked.appointmentStatus === 'accepted' && <span>You are scheduled </span>}
                    to collect VEG NAME HERE from GROWER HERE on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('h:mm')}. 
                  </div>
                ))
              }
            </div>
            
          </section>
        </div>
      </>
    )
  }
}

export default Dashboard