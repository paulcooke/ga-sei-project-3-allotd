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
      mapSwitch: false
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.filterVegetables = this.filterVegetables.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleIncomingRedirect = this.handleCheckbox.bind(this)
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
    value ? this.setState({ [name]: value }) : this.setState({ [dataset.name]: (value || innerHTML) })
  }

  filterVegetables() {
    const { searchTerm } = this.state
    const re = new RegExp(searchTerm, 'i')
    return this.state.vegetables.filter(veg => {
      return re.test(veg.title)
    })
  }

  submitSearch(e) {
    e.preventDefault()
    axios.get('/api/vegetables')
      .then(res => {
        const filteredArr = res.data.filter(veg => new RegExp(this.state.searchTerm, 'i').test(veg.title))
        // if searchterm is false dont bother doing anything
        this.state.searchTerm ? this.setState({ vegetables: filteredArr }) : false
      })
      .catch(err => console.log(err))
  }

  handleCheckbox({ target: { name, checked } }) {
    this.setState({ [name]: checked })
  }

  render() {
    if (!this.state.vegetables) return null
    console.log(this.state)
    return (
      <>
        <label className='checkbox'> Toggle Map 
          <input 
            type='checkbox'
            name='mapSwitch'
            onChange={this.handleCheckbox} 
          />
          <span className='checkmark'></span>
        </label> 
        
        {!this.state.mapSwitch &&
          <>
            <SearchForm
              name='searchTerm'
              value={this.state.mapSwitch}
              onChange={this.onChange}
              onSubmit={this.submitSearch}
            />
            <div className='indexWrapper'>
              {this.filterVegetables().map(vegetable => (
                <VegetableCard key={vegetable._id} {...vegetable} />
              ))}
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