import React from 'react'
import { withRouter } from 'react-router-dom' 
import Dropdown from './Dropdown'

class SearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      valBeforeRedirect: ''
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.storeValForRedirect = this.storeValForRedirect.bind(this)
  }

  handleRedirect(e) {
    if (this.props.location.pathname !== '/vegetables') this.props.history.push({
      pathname: '/vegetables',
      search: '?query=abc',
      // use innerHTML from dropdown or vbr for search text
      state: { detail: e.target.innerHTML || this.state.valBeforeRedirect }
    })
  }
  
  storeValForRedirect(e) {
    const valBeforeRedirect = e.target.name || e.target.innerHTML// = e.target.value
    this.setState({ valBeforeRedirect: valBeforeRedirect })
  }

  render() {
    const { onChange, onSubmit, name } = this.props
    if (this.props.location.state) console.log('value: ', this.props.location.state)
    return (
      <>
        <form
          className='searchForm'
          onChange={onChange ? onChange : this.storeValForRedirect} //no func from idx, store val until redirect 
          onSubmit={onSubmit ? onSubmit : this.handleRedirect} //no function passed from index then redirect to there
        >
          <Dropdown
            vegetable={this.state.region}
            onClick={onChange ? onChange : this.handleRedirect}
          />
          <input name={name} placeholder='Search...' />
          <button type='submit'>Search</button>
        </form>
      </>
    )
  }
}

export default withRouter(SearchForm)