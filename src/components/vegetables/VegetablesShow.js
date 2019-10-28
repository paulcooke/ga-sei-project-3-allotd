import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'
import moment from 'moment'
import SearchForm from '../common/SearchForm'
import VegetablesRecipe from './VegetablesRecipe'

class VegetablesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetable: null,
      newAppointment: {},
      errors: {},
      recipes: []
    }
    
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const vegId = this.props.match.params.id //only need this reference once
    axios.get(`/api/vegetables/${vegId}`)
      .then(res => {
        this.setState({ vegetable: res.data })
      })
     
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
    const newValue = type === 'checkbox' ? checked : value // checks the box if the value matches

    const day = name === 'selectedPickUpDay' ? value : this.state.newAppointment.selectedPickUpDay
    const hour = name === 'selectedPickUpTime' ? value : this.state.newAppointment.selectedPickUpTime
    console.log('checking day', day)
    console.log('checking hour', hour)
    const dayArray = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ] // for use below in getting the right number for moment's 'day'
    const setDayAndTime = moment().hour(parseInt(hour)).minute(0).second(0).add(dayArray.indexOf(day), 'days')._d
    
    const newAppointment = { ...this.state.newAppointment, [name]: newValue, appointmentDateandTime: setDayAndTime, appointmentStatus: 'requested' } // requested added here because if it's sent then this is tru, if it's not, it will dissapear from state when the user moves away from the page
    const errors = { ...this.state.errors, [name]: '' } // for use in error handling
    const vegetable = { ...this.state.vegetable, isClaimed: true } // setting state here because if they go ahead it's true, if not it will be lost from state when the user moves away
    
    this.setState({ newAppointment, errors, vegetable })
  }



  handleSubmit(e) {
    e.preventDefault()
    
    const vegetableId = this.props.match.params.id
    axios.post(`/api/vegetables/${vegetableId}/appointment`, this.state.newAppointment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => axios.patch(`/api/vegetables/${vegetableId}`, this.state.vegetable))
      .then(() => this.props.history.push('/vegetables'))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    console.log(this.state)
    if (!this.state.vegetable) return null
    const { image, title, typeOfVeg, varietyOfVeg, pickedDate, description, isClaimed,
      vegLocation, availablePickUpDays, availablePickUpTimes, user, pickUpAppointment
    } = this.state.vegetable
    console.log()
    return (
      <>
        <SearchForm />
        <div className='showWrapper'>
          <div className='imgAndInfo'>
            <img src={image} alt={title} />
            <div className='panelWrapper'>
              <div>
                <h1>{title}</h1>
                {isClaimed && <p>CLAIMED!</p>}
                <p>Type: {typeOfVeg}</p>
                <p>Variety: {varietyOfVeg}</p>
                <p>Picked: {this.handleDate(pickedDate)}</p>
                <p>Description: {description}</p>
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
              {!this.isOwner() && !pickUpAppointment &&
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
            </div>
            
          </div>
          {!this.isOwner() && Auth.isAuthenticated() && !pickUpAppointment &&
            <div className="panelWrapper claimWrapper">
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
          <div className='panelWrapper'>
            <h2>Recipes with {typeOfVeg}</h2>
            <div>
              <VegetablesRecipe
                id={this.props.match.params.id}
                veg={this.state.vegetable}
              />
            </div>
              
          </div>
        </div>
      </>
    )
  }
}

export default VegetablesShow