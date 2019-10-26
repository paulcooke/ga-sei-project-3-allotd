import React from 'react'

const SearchForm = ({ name, onChange, onSubmit }) => (
  <form onChange={onChange} onSubmit={onSubmit}>
    <input name={name} placeholder='search => typeOfVeg' />
    <button type='submit'>Search</button>
  </form>
)

export default SearchForm