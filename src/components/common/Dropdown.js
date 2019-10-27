import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { 
      value: 'All'
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">
          <span> Type </span>
          <i className="fas fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <li data-name="searchTerm" onClick={this.props.onClick}>All</li>
          <li data-name="searchTerm" onClick={this.props.onClick}>Tomato</li>
          <li data-name="searchTerm" onClick={this.props.onClick}>Asparagus</li>
          <li data-name="searchTerm" onClick={this.props.onClick}>Aubergine</li>
          <li data-name="searchTerm" onClick={this.props.onClick}>Apple</li>
          <li data-name="searchTerm" onClick={this.props.onClick}>Cucumber</li>
        </div>
      </div>
    )
  }
}

export default Dropdown