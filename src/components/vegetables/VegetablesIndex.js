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
    console.log('submit clicked. ')
    axios.get('/api/vegetables')
      .then(res => {
        console.log('search data: ', res.data)
        const filteredArr = res.data.filter(veg => veg.typeOfVeg === this.state.searchTerm)
        this.setState({ vegetables: filteredArr })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (!this.state.vegetables) return null
    return (
      <>
        <SearchForm name='searchTerm' onChange={this.onChange} onSubmit={this.submitSearch}/>
        <div className='indexWrapper'>
          {this.state.vegetables.map(vegetable => (
            <VegetableCard key={vegetable._id} {...vegetable} />
          ))}
        </div>
      </>
    )
  }
}

export default VegetablesIndex