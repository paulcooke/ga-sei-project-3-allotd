import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'

import VegetableChat from '../vegetables/VegetablesChat'

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
        pickedVegHistory: [],
        addressLineOne: '', 
        addressLineTwo: '', 
        addressCity: '', 
        addressPostcode: ''
      },
      displayStatus: {}
    }

    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMarkCollected = this.handleMarkCollected.bind(this)
    this.handleGrowerCancel = this.handleGrowerCancel.bind(this)
    this.handlePickerCancel = this.handlePickerCancel.bind(this)
  }

  componentDidMount() {
    
    axios.get('/api/profile', { 
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const displayStatus = {}
        res.data.listingHistory.forEach(listing => {
          displayStatus[listing._id] = false 
        })
        this.setState({ data: res.data, displayStatus })
      })
      .catch(err => console.log(err.message))
  }
  //res.data.listingHistory.listing.pickUpAppointment.id
  getUserInfo () {
    axios.get('/api/profile', { 
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  //this needs to update the appointment status in the appointment model
  handleAccept(appointmentId) {
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'accepted' })
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  //this needs to update the appointment status in the appointment model, possibly also deleting this but needs to update the picker, perhaps it puts them back on the schedule page
  handleReject(appointmentId, vegetableId) {
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'rejected' })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, { isClaimed: false }))
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  handleGrowerCancel(appointmentId, vegetableId) {
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'cancelled' })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, { isClaimed: false }))
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  handlePickerCancel(appointmentId, vegetableId) {
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'cancelled' })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, { isClaimed: false }))
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  handleMarkCollected(appointmentId) {
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'completed' })
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  isOwner() {
    // console.log(this.state.data._id)
    return Auth.getPayload().sub === this.state.data._id
  }

  handleDelete(e) {
    const vegetableId = e.target.value
    axios.delete(`/api/vegetables/${vegetableId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  handleSubmitMessage(appId, text) {
    axios.post(`/api/appointments/${appId}/messages`, { text }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        this.getUserInfo()
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('STATE IS', this.state)
    console.log('displayStatus: ', this.state.displayStatus)
    return (
      <>
        <div className='dashWrapper'>
          <div className='panelWrapper'>
            <div>
              <h1>Dashboard</h1>
            </div>
            <div>
              <h2>Username: {this.state.data.username}</h2>
              {this.state.data.rating && <h2>User Rating {this.state.data.rating}: </h2>}
            </div>

            {this.state.data.vegGrown.length > 0 &&
            <div>
              <h2>Grown by me</h2>
              {this.state.data.vegGrown.map(veg =>
                <p key={veg}>{veg}</p>
              )}
            </div>
            }

            {this.state.data.vegLookingFor.length > 0 && 
            <div>
              <h2>Veggies I like</h2>
              {this.state.data.vegLookingFor.map(veg =>
                <p key={veg}>{veg}</p>
              )}
            </div>
            }

            <div className='pickupDays'>
              <h2>My preferred days for people to collect from me:</h2>
              {this.state.data.availablePickUpDays.map(day => {
                return <p key={day}>{day}</p>
              })}
            </div>
            <p>At:</p>
            <div className='pickupTimes'>
              {this.state.data.availablePickUpTimes.map(time => {
                return <p key={time}>{time}:00, </p>
              })}
            </div>
            
            {this.isOwner() &&
              <div className='buttonWrapper'>
                <Link to={`/dashboard/${this.state.data.id}/edit`}>
                  <button>Edit profile</button>
                </Link>
              </div>
            }
            
          </div>

          <div className='dashPanelWrapper'>
            <h2>My listings</h2>
            {
              this.state.data.listingHistory.map(listing => (
                <div key={listing._id} className="listingWrapper">
                  <div>
                    {listing.title}, listed on {moment(listing.createdAt).format('dddd, MMMM Do')} at {moment(listing.createdAt).format('HH:mm')}.

                    <div className='buttonWrapper'>
                      <Link to={`/vegetables/${listing._id}/edit`}>
                        {!listing.isClaimed && <button>Edit vegetable</button>}
                        {listing.isClaimed && <button disabled>Edit vegetable</button>}
                      </Link>
                      {!listing.isClaimed && <button onClick={this.handleDelete} value={listing._id}>Delete vegetable</button>}
                      {listing.isClaimed && <button disabled onClick={this.handleDelete}>Delete vegetable</button>}
                      {console.log('pickupApointment: ', listing.pickUpAppointment)}
                    </div>
                    {listing.isClaimed && <p><em>*Claimed veg cannot be edited or deleted</em></p>}
                  </div>
                  {listing.isClaimed && listing.pickUpAppointment.appointmentStatus === 'requested' &&
                    <div>
                      <p>This veg has been claimed by {listing.pickUpAppointment.pickerId.username}. They want to collect it on {moment(listing.pickUpAppointment.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(listing.pickUpAppointment.appointmentDateandTime).format('HH:mm')}.</p>
                      <p>Would you like to accept this?</p>
                      <button onClick={() => this.handleAccept(listing.pickUpAppointment.id)}>Accept</button> 
                      <button onClick={() => this.handleReject(listing.pickUpAppointment.id, listing.pickUpAppointment.vegId._id)}>Reject</button>
                    </div>
                  }
                  {listing.isClaimed && listing.pickUpAppointment.appointmentStatus === 'accepted' &&
                    <div>
                      <p>{listing.pickUpAppointment.pickerId.username} claimed the {listing.title.toLowerCase()} and will collect it on {moment(listing.pickUpAppointment.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(listing.pickUpAppointment.appointmentDateandTime).format('HH:mm')}</p>
                      <div className='buttonWrapper'>
                        <button onClick={() => this.handleGrowerCancel(listing.pickUpAppointment.id, listing.pickUpAppointment.vegId._id)}>Cancel collection</button>
                        <button onClick={() => this.handleMarkCollected(listing.pickUpAppointment._id)}>Mark as collected</button> 
                      </div>
                    </div>
                  }
                  {listing.isClaimed && listing.pickUpAppointment.appointmentStatus === 'completed' &&
                    <p>{listing.pickUpAppointment.pickerId.username} collected the {listing.title.toLowerCase()} on {moment(listing.pickUpAppointment.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(listing.pickUpAppointment.appointmentDateandTime).format('HH:mm')}</p>
                  }
                  {!listing.isClaimed &&
                    <div>
                      Not currently claimed.
                    </div>
                  }
                  {listing.pickUpAppointment && listing.pickUpAppointment.appointmentStatus === 'rejected' &&
                    <p>You cancelled collection by {listing.pickUpAppointment.pickerId.username}.</p>
                  }
                  {listing.pickUpAppointment && listing.pickUpAppointment.appointmentStatus === 'cancelled' &&
                    <p>Collection by {listing.pickUpAppointment.pickerId.username} was cancelled.</p>
                  }
                  {listing.pickUpAppointment &&
                  <>
                    <p>Discuss collection</p>
                    <VegetableChat
                      appointmentId={listing.pickUpAppointment._id}
                      messages={listing.pickUpAppointment.messages}
                      getUserInfo={() => this.getUserInfo()}
                      handleSubmitMessage={this.handleSubmitMessage}
                      userId={this.state.data._id}
                    />
                  </>
                  }
                </div>
              ))
            }
          </div>
          <div className='dashPanelWrapper pickupsWrapper'>
            <h2>My pickups</h2>
            {
              this.state.data.pickedVegHistory.map(picked => (

                <div key={picked.id}>
                  {picked.appointmentStatus === 'requested' &&
                    <span>You have requested to collect {picked.vegId.title} from {picked.vegId.user.username} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('HH:mm')}.</span>
                  }
                  {picked.vegId && picked.appointmentStatus === 'accepted' &&
                    <>
                      <p>{picked.vegId.user.username} has accepted your request to collect {picked.vegId.title}.</p>
                      <p>Collect from {picked.vegId.user.addressLineOne}, {picked.vegId.user.addressPostcode} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('HH:mm')}</p>
                      <button onClick={() => this.handlePickerCancel(picked.id, picked.vegId._id)}>Cancel collection</button>
                    </>
                  }
                  {picked.vegId && picked.appointmentStatus === 'cancelled' &&
                    <p>Collection of {picked.vegId.title} from {picked.vegId.user.username} was cancelled.</p>
                  }
                  {picked.vegId && picked.appointmentStatus === 'completed' &&
                    <p>You collected {picked.vegId.title} from {picked.vegId.user.username} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('HH:mm')}.</p>
                  }
                  {picked.vegId && picked.appointmentStatus === 'rejected' &&
                    <p><s>{picked.vegId.user.username} rejected your request to collect {picked.vegId.title}</s></p>
                  }
                  {picked && 
                    <VegetableChat
                      appointmentId={picked._id}
                      messages={picked.messages}
                      getUserInfo={() => this.getUserInfo()}
                      handleSubmitMessage={this.handleSubmitMessage}
                      userId={this.state.data._id}
                    />
                  }
                </div>
              ))
            }
          </div>
        </div>
      </>
    )
  }
}
export default Dashboard

