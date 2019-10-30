import React from 'react'
// import SearchForm from './SearchForm'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
 
    <main className='hero'>
      <h1 className='homeTitle'>ALLOTTED🥕</h1>
      <div className='about'>
      GROW.  CONNECT.  SHARE.
        <br />
        <br />
      We connect you with green-fingered folk in your neighbourhood and beyond so you can give
      or receive excess produce, helping your community to reduce food waste whilst enjoying fresh, seasonal veg.
      </div>
     
      <Link className='indexLink'to='/vegetables'><div>Browse our veg</div> </Link>
      {/* <span className='searchHome'>
        <SearchForm />  
        
       
        
      </span> */}


    </main>
  </>
)

export default Home