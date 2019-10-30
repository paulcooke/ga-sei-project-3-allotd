import React from 'react'
import { Link } from 'react-router-dom'

const VegetableCard = ({ _id, title, image, description, user, vegLocation, isClaimed }) => (
  <Link to={`/vegetables/${_id}`}>
    <div className='vegCard'>
      {isClaimed && <p>CLAIMED!</p>}
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Description: {description}</p>
      <p>Location: {vegLocation}</p>
      <p>Posted by: {user.username}</p>
    </div>
  </Link>
)

export default VegetableCard