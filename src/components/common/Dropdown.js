import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { 
      value: 'All'
    }
  }

  render() {
    console.log('current', this.props.current)
    return (
      <div className="dropdown">
        <button className="dropbtn">
          <span>{this.props.current}</span>
          <i className="fas fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <li data-name="typeSearch" onClick={this.props.onClick}>All</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Tomato</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Asparagus</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Aubergine</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Apple</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Cucumber</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Pumpkin</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Carrots</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Parsnips</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Garlic</li>
          <li data-name="typeSearch" onClick={this.props.onClick}>Onions</li>
        </div>
      </div>
    )
  }
}

export default Dropdown