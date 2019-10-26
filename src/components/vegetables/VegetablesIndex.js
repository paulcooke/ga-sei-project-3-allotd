import React from 'react'
import axios from 'axios'

import VegetableCard from './VegetableCard'


// paul - might need axios for filtery stuff



import SearchForm from '../common/SearchForm'


class VegetablesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      vegetables: null
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  componentDidMount() {
    axios.get('/api/vegetables')
      .then(res => this.setState({ vegetables: res.data }))
      .catch(err => console.log(err))
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  submitSearch(e) {
    e.preventDefault()
    axios.get('/api/vegetables')
      .then(res => {
        console.log('search data: ', res.data)
        const filteredArr = res.data.filter(veg => veg.typeOfVeg === this.state.searchTerm)
        // if searchterm is false dont bother doing anything
        this.state.searchTerm ? this.setState({ vegetables: filteredArr }) : false
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (!this.state.vegetables) return null
    return (
      <>
        <SearchForm 
          name='searchTerm' 
          onChange={this.onChange} 
          onSubmit={this.submitSearch}
        />
        <div className='indexWrapper'>
          {this.props.location.state && // if a value has been passed from another page then use it to filter
           this.state.vegetables.filter(veg => veg.typeOfVeg === this.props.location.state.detail)
             .map(vegetable => (
               <VegetableCard key={vegetable._id} {...vegetable} />
             ))}
          {!this.props.location.state && // if no value from a redirect then render all on mount
           this.state.vegetables.map(vegetable => (
             <VegetableCard key={vegetable._id} {...vegetable} />
           ))}
        </div>
      </>
    )
  }
}

export default VegetablesIndex