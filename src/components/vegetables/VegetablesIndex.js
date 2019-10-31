import React from 'react'
import axios from 'axios'

import VegetableCard from './VegetableCard'
import SearchForm from '../common/SearchForm'
import VegetableMap from '../vegetables/VegetablesMap'


class VegetablesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetables: null,
      searchTerm: '',
      typeSearch: 'All',
      mapSwitch: false
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.filterVegetables = this.filterVegetables.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleIncomingRedirect = this.handleCheckbox.bind(this)
    this.handleUncheck = this.handleUncheck.bind(this)
    
  }

  componentDidMount() {
    // check if it exist, if so, use it as the serach term when page loads
    const searchFromRedirect = this.props.location.state ? this.props.location.state.detail : ''
    axios.get('/api/vegetables')
      .then(res => this.setState({ vegetables: res.data, searchTerm: searchFromRedirect }))
      .catch(err => console.log(err))
  }

  onChange({ target: { name, value, dataset, innerHTML } }) {
    //for the <li> dropdown, value is wiped during re render. use dataset and innerhtml in that case
    value ? this.setState({ [name]: value }) : this.setState({ [dataset.name]: innerHTML })
  }

  filterVegetables() {
    const { searchTerm, typeSearch } = this.state
    const re = new RegExp(searchTerm, 'i')
    const type = new RegExp(typeSearch, 'i')
    const filteredArr = this.state.vegetables.filter(veg => {
      //return re.test(veg.title) && (veg.typeOfVeg === typeSearch || typeSearch === 'All')
      return (!veg.pickUpAppointment || (veg.pickUpAppointment && veg.pickUpAppointment.appointmentStatus !== 'completed')) && (re.test(veg.title) && (type.test(veg.typeOfVeg) || (typeSearch === 'All')))
    })
    return filteredArr
  }

  displayVegetables(filteredArr) {
    const vegCards = filteredArr.map(vegetable => (
      <VegetableCard key={vegetable._id} {...vegetable} />
    ))
    return vegCards.length !== 0 ? vegCards : <h2>Your search returned no Results. Maybe you could grow this veg for us?...</h2>
  }

  submitSearch(e) {
    e.preventDefault()
    axios.get('/api/vegetables')
      .then(res => {
        const filteredArr = res.data.filter(veg => new RegExp(this.state.searchTerm, 'i').test(veg.title))
        // if searchterm is false dont bother doing anything
        this.state.searchTerm ? this.setState({ vegetables: filteredArr }) : false
      })
      .then(() => this.setState({ searchTerm: '' }))
      .catch(err => console.log(err))
  }

  handleCheckbox({ target: { name, checked } }) {
    this.setState({ [name]: checked })
  }

  handleUncheck() {
    this.setState({ mapSwitch: false })
  }

  render() {
    if (!this.state.vegetables) return null
    console.log(this.state)
    return (
      <>

        {!this.state.mapSwitch &&
        <>
          <label className='checkbox'> Map View 
            <input 
              type='checkbox'
              name='mapSwitch'
              onChange={this.handleCheckbox} 
            />
            <span className='checkmark'></span>
          </label> 
        </>
        }
        {this.state.mapSwitch &&
        <>
          <label className='checkbox'> List View 
            <input 
              type='checkbox'
              name='mapSwitch'
              onChange={this.handleUncheck}
            />
            <span className='checkmark'></span>
          </label> 
        </>
        }
        
        {!this.state.mapSwitch &&
          <>
            <SearchForm
              name='searchTerm'
              value={this.state.mapSwitch}
              onChange={this.onChange}
              onSubmit={this.submitSearch}
              current={this.state.typeSearch}
            />
            <div className='indexWrapper'>
              {this.displayVegetables(this.filterVegetables())}
            </div>
          </>
        }
        {this.state.mapSwitch &&
          <>
            <VegetableMap />
          </>
        }
      </>
    )
  }
}

export default VegetablesIndex

// {this.props.location.state && // if a value has been passed from another page then use it to filter
//   this.state.vegetables.filter(veg => new RegExp(this.props.location.state.detail, 'i').test(veg.title))
//     .map(vegetable => (
//       <VegetableCard key={vegetable._id} {...vegetable} />
//     ))}
// {!this.props.location.state && // if no value from a redirect then render all after dynamic filter
//   this.filterVegetables().map(vegetable => (
//     <VegetableCard key={vegetable._id} {...vegetable} />
//   ))}