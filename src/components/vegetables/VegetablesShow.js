import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'
import moment from 'moment'
//import 'moment/locale/en-gb'


class VegetablesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetable: null
    }
    
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDate = this.handleDate.bind(this)
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

  render() {
    if (!this.state.vegetable) return null
    const { image, title, typeOfVeg, varietyOfVeg, pickedDate, description, isClaimed,
      vegLocation, availablePickUpDays, availablePickUpTimes, user
    } = this.state.vegetable
    return (
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
              <p>vegLocation: {vegLocation}</p>
              <p>Available on {availablePickUpDays} at {availablePickUpTimes}</p>
              <p>Posted by: {user.username}</p>
            </div>
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
            <div className="panelWrapper">
              <h3>Claim this vegetable</h3>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VegetablesShow