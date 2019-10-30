import React from 'react'
import SearchForm from './SearchForm'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
 
    <main className='hero'>
      <h1 className='homeTitle'>ALLOTTED🥕</h1>
      <div className='about'>
        about goes here
      </div>
     
      <Link className='indexLink'to='/vegetables'>browse our veg </Link>
      <span className='searchHome'>
        <SearchForm />  
        
       
        
      </span>


    </main>
  </>
)

export default Home