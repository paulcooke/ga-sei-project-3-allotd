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
    this.getUserInfo()
  }

  getUserInfo () {
    const userId = this.props.match.params.id//why is this null when i log it?
    axios.get(`/api/profile/${userId}`, { // how is this working? LN
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  //this needs to update the appointment status in the appointment model
  handleAccept(e) {
    const appointmentId = e.target.value
    console.log(appointmentId)
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'accepted' })
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  //this needs to update the appointment status in the appointment model, possibly also deleting this but needs to update the picker, perhaps it puts them back on the schedule page
  handleReject(e) {
    const appointmentId = e.target.value
    const vegetableId = this.state.data.listingHistory.find(veg => veg.pickUpAppointment.id === appointmentId)._id
    console.log('veg id', vegetableId)
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'rejected' })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, { isClaimed: false }))
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
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
                    {listing.isClaimed && listing.pickUpAppointment.appointmentStatus === 'requested' &&
                    <div>                      
                      <p>This veg has been CLAIMED by {listing.pickUpAppointment.pickerId.username}. They want to collect it on {moment(listing.pickUpAppointment.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(listing.pickUpAppointment.appointmentDateandTime).format('h:mm')}.</p>
                      <p>Would you like to accept this?</p>
                      <button onClick={this.handleAccept} value={listing.pickUpAppointment._id}>Accept</button> <button onClick={this.handleReject} value={listing.pickUpAppointment._id}>Reject</button>
                    </div>
                    }
                    {listing.isClaimed && listing.pickUpAppointment.appointmentStatus === 'accepted' &&
                      <div>
                        <p>{listing.pickUpAppointment.pickerId.username} claimed the {listing.title.toLowerCase()} and will collect it on {moment(listing.pickUpAppointment.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(listing.pickUpAppointment.appointmentDateandTime).format('h:mm')}</p>
                      </div>
                    }
                    {!listing.isClaimed &&
                      <div>
                        Not currently claimed.
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
                    {picked.appointmentStatus === 'requested' && 
                      <span>You have requested to collect {picked.vegId.title} from {picked.vegId.user.username} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('h:mm')}.</span>} 
                    {picked.appointmentStatus === 'accepted' &&
                      <span>{picked.vegId.user.username} has accepted your request to collect {picked.vegId.title} {picked.vegId.user.username} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('h:mm')}.</span>} 
                    {picked.appointmentStatus === 'rejected' &&
                      <p><s>{picked.vegId.user.username} rejected your request to collect {picked.vegId.title}</s></p>
                    } 
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