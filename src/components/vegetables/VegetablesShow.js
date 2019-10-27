import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'
import moment from 'moment'
import SearchForm from '../common/SearchForm'
//import 'moment/locale/en-gb'


class VegetablesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetable: null,
      newAppointment: {},
      errors: {}
    }
    
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const vegId = this.props.match.params.id //only need this reference once
    axios.get(`/api/vegetables/${vegId}`)
      .then(res => this.setState({ vegetable: res.data }))
      .catch(err => console.log(err))
  }

  handleDelete() {
    const vegetableId = this.props.match.params.id
    axios.delete(`/api/vegetables/${vegetableId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/vegetables'))
      .catch(err => console.log(err))
  }

  isOwner() {
    return Auth.getPayload().sub === this.state.vegetable.user._id
  }

  handleDate(pickedDate) {
    moment.locale('en')
    const inputDate = moment(pickedDate, 'DD/MM/YYYY')
    return inputDate.add(1, 'days').from(moment.now())
  }
  
  handleChange({ target: { name, value, type, checked } }) {
    const newValue = type === 'checkbox' ? checked : value
    let newAppointment = { ...this.state.newAppointment, [name]: newValue }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ newAppointment, errors })
    const setDayAndTime = this.makeAppointmentDate(this.state.newAppointment.selectedPickUpTime, this.state.newAppointment.selectedPickUpDay)
    newAppointment = { ...newAppointment, appointmentDateandTime: setDayAndTime }
    this.setState({ newAppointment })
  }

  makeAppointmentDate(day, hour) {
    const dayArray = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
    return moment().hour(parseInt(hour)).minute(0).second(0).add(dayArray.indexOf(day) + 1, 'days')._d
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const vegetableId = this.props.match.params.id
    axios.post(`/api/vegetables/${vegetableId}/appointment`, this.state.newAppointment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/vegetables'))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    console.log(this.state)
    if (!this.state.vegetable) return null
    const { image, title, typeOfVeg, varietyOfVeg, pickedDate, description, isClaimed,
      vegLocation, availablePickUpDays, availablePickUpTimes, user, pickUpAppointment
    } = this.state.vegetable
    return (
      <>
        <SearchForm />
        <div className='showWrapper'>
          <div className='imgAndInfo'>
            <img src={image} alt={title} />
            <div className='panelWrapper'>
              <div>
                <h1>{title}</h1>
                <p>Type: {typeOfVeg}</p>
                <p>Variety: {varietyOfVeg}</p>
                <p>Picked: {this.handleDate(pickedDate)}</p>
                <p>Description: {description}</p>
                <p>Claimed: {isClaimed}</p>
                <p>Posted by: {user.username}</p>
              </div>
              {this.isOwner() &&
                <div className='buttonWrapper'>
                  <Link to={`/vegetables/${this.state.vegetable._id}/edit`}>
                    <button>Edit vegetable</button>
                  </Link>
                  <button onClick={this.handleDelete}>Delete vegetable</button>
                </div>
              }
              {!this.isOwner() && pickUpAppointment.length < 1 &&
              <div>
                {this.isOwner() &&
                  <>
                    <Link to={`/vegetables/${this.state.vegetable._id}/edit`}>
                      <button>Edit vegetable</button>
                    </Link>
                    <button onClick={this.handleDelete}>Delete vegetable</button>
                  </>
                }
              </div>
              }
              {!this.isOwner() && Auth.isAuthenticated() && pickUpAppointment.length < 1 &&
                <div className="panelWrapper">
                  <form>
                    <h2>Claim this veg from {user.username}</h2>
                    <p>Veg location: {vegLocation}</p>

                    <h3>Pick an upcoming day from the grower`&apos;`s preferences</h3>
                    <div>
                      {
                        availablePickUpDays.map(day => (
                          <label key={day}>
                            <input
                              type="radio"
                              name="selectedPickUpDay"
                              value={day}
                              checked={this.state.newAppointment.selectedPickUpDay === day}
                              onChange={this.handleChange}
                            />
                            {day}
                          </label>
                        ))
                      }
                    </div>
                    <br />
                    <h3>and a time...</h3>
                    <div>
                      {
                        availablePickUpTimes.map(time => (
                          <label key={time}>
                            <input
                              type="radio"
                              name="selectedPickUpTime"
                              value={time}
                              checked={this.state.newAppointment.selectedPickUpTime === time}
                              onChange={this.handleChange}
                            />
                            {`${time}:00`}
                          </label>
                        ))
                      }
                    </div>
                    {this.state.newAppointment.selectedPickUpDay && <p>You are requesting collection on {this.state.newAppointment.selectedPickUpDay} {this.state.newAppointment.selectedPickUpTime && <span>at {this.state.newAppointment.selectedPickUpTime}:00</span>}</p>}
                    <button onClick={this.handleSubmit}>Request pickup</button>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default VegetablesShow