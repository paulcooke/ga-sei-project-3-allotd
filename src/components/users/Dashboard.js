import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'

import SearchForm from '../common/SearchForm'
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
      displayStatus: {
        
      }
    }

    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    // this.handleChatButton = this.handleChatButton.bind(this)
    // this.handleChatButton = this.handleChatButton.bind(this)
  }

  componentDidMount() {
    
    axios.get('/api/profile', { // how is this working? LN
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
  getUserInfo () {//why is this null when i log it?
    axios.get('/api/profile', { // how is this working? LN
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err.message))
  }

  //this needs to update the appointment status in the appointment model
  handleAccept(e) {
    const appointmentId = e.target.value
    // console.log(appointmentId)
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'accepted' })
      .then(() => this.getUserInfo())
      .catch(err => console.log(err))
  }

  //this needs to update the appointment status in the appointment model, possibly also deleting this but needs to update the picker, perhaps it puts them back on the schedule page
  handleReject(e) {
    const appointmentId = e.target.value
    const vegetableId = this.state.data.listingHistory.find(veg => veg.pickUpAppointment.id === appointmentId)._id
    console.log('veg id', vegetableId)
    axios.patch(`/api/appointments/${appointmentId}`, { appointmentStatus: 'rejected', appointmentDateandTime: '', messages: [] })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, { isClaimed: false }))
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
          <div className='dashPanelWrapper'>
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

            <div>
              <h2>My preferred days for people to collect from me:</h2>
              <ul>
                {this.state.data.availablePickUpDays.map(day => {
                  return <li key={day}>{day}</li>
                })}
              </ul>
            </div>
            <div>
              <p>At:</p>
              <ul>
                {this.state.data.availablePickUpTimes.map(time => {
                  return <li key={time}>{time}:00</li>
                })}
              </ul>
            </div>
            
            {this.isOwner() &&
              <>
                <Link to={`/dashboard/${this.state.data.id}/edit`}>
                  <button>Edit profile</button>
                </Link>
              </>
            }
            
          </div>

          <div className='dashPanelWrapper'>
            <h2>My listings</h2>
            {
              this.state.data.listingHistory.map(listing => (
                <div key={listing._id} className="listingWrapper">
                  <div>
                    {listing.title}, listed on {moment(listing.createdAt).format('dddd, MMMM Do')} at {moment(listing.createdAt).format('h:mm')}.
                    <div>
                      <Link to={`/vegetables/${listing._id}/edit`}>
                        {!listing.isClaimed && <button>Edit vegetable</button>}
                        {listing.isClaimed && <button disabled>Edit vegetable</button>}
                      </Link>
                      {!listing.isClaimed && <button onClick={this.handleDelete} value={listing._id}>Delete vegetable</button>}
                      {listing.isClaimed && <button disabled onClick={this.handleDelete}>Delete vegetable</button>}
                      {listing.isClaimed && <p><em>Claimed veg cannot be edited or deleted</em></p>}

                      {console.log('pickupApointment: ', listing.pickUpAppointment)}
                    </div>
                  </div>
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
                  {listing.pickUpAppointment &&
                    <VegetableChat
                      appointmentId={listing.pickUpAppointment._id}
                      messages={listing.pickUpAppointment.messages}
                      getUserInfo={() => this.getUserInfo()}
                      handleSubmitMessage={this.handleSubmitMessage}
                    />
                  }
                </div>
              ))
            }
          </div>
          <div className='dashPanelWrapper'>
            <h2>My pickups</h2>
            {
              this.state.data.pickedVegHistory.map(picked => (

                <div key={picked.id}>
                  {picked.appointmentStatus === 'requested' &&
                    <span>You have requested to collect {picked.vegId.title} from {picked.vegId.user.username} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('h:mm')}.</span>}
                  {picked.vegId && picked.appointmentStatus === 'accepted' &&
                    <>
                      <p>{picked.vegId.user.username} has accepted your request to collect {picked.vegId.title}.</p>
                      <p>Collect from {picked.vegId.user.addressLineOne}, {picked.vegId.user.addressPostcode} on {moment(picked.appointmentDateandTime).format('dddd, MMMM Do')} at {moment(picked.appointmentDateandTime).format('h:mm')}</p>
                    </>
                  }
                  {picked.vegId && picked.appointmentStatus === 'rejected' &&
                    <p><s>{picked.vegId.user.username} rejected your request to collect {picked.vegId.title}</s></p>
                  }
                  {console.log('picked id: ', picked._id)}
                  {console.log('picked Appointments: ', picked)}
                  {picked && !picked.appointmentStatus === 'rejected' &&
                    <VegetableChat
                      appointmentId={picked._id}
                      messages={picked.messages}
                      getUserInfo={() => this.getUserInfo()}
                      handleSubmitMessage={this.handleSubmitMessage}
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