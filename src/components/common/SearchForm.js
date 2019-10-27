import React from 'react'
import { withRouter } from 'react-router-dom' 

class SearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      valBeforeRedirect: ''
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.storeValForRedirect = this.storeValForRedirect.bind(this)
  }

  handleRedirect() {
    if (this.props.location.pathname !== '/vegetables') this.props.history.push({
      pathname: '/vegetables',
      search: '?query=abc',
      state: { detail: this.state.valBeforeRedirect }
    })
  }

  storeValForRedirect(e) {
    const valBeforeRedirect = [e.target.name] = e.target.value
    this.setState({ valBeforeRedirect })
  }

  render() {
    const { onChange, onSubmit, name } = this.props
    if (this.props.location.state) console.log('value: ', this.props.location.state)
    return (
      <form 
        className='searchForm'
        onChange={onChange ? onChange : this.storeValForRedirect} //no func from idx, store val until redirect 
        onSubmit={onSubmit ? onSubmit : this.handleRedirect} //no function passed from index then redirect to there
      >
        <input name={name} placeholder='search => typeOfVeg' />
        <button type='submit'>Search</button>
      </form>
    )
  }
}

export default withRouter(SearchForm)