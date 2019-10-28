import React from 'react'
import axios from 'axios'

import VegetableCard from './VegetableCard'
import SearchForm from '../common/SearchForm'

class VegetablesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetables: null,
      searchTerm: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.filterVegetables = this.filterVegetables.bind(this)
  }

  componentDidMount() {
    axios.get('/api/vegetables')
      .then(res => this.setState({ vegetables: res.data }))
      .catch(err => console.log(err))
  }

  onChange({ target: { name, value, dataset, innerHTML } }) {
    console.log('onchange was called. ')
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

  render() {
    if (!this.state.vegetables) return null
    console.log(this.state)
    return (
      <>
        <SearchForm 
          name='searchTerm' 
          onChange={this.onChange} 
          onSubmit={this.submitSearch}
        />
        <div className='indexWrapper'>
          {this.props.location.state && // if a value has been passed from another page then use it to filter
           this.state.vegetables.filter(veg => new RegExp(this.props.location.state.detail, 'i').test(veg.title))
             .map(vegetable => (
               <VegetableCard key={vegetable._id} {...vegetable} />
             ))}
          {!this.props.location.state && // if no value from a redirect then render all after dynamic filter
           this.filterVegetables().map(vegetable => (
             <VegetableCard key={vegetable._id} {...vegetable} />
           ))}
        </div>
      </>
    )
  }
}

export default VegetablesIndex