import React from 'react'
import { Link } from 'react-router-dom'

const VegetableCard = ({ _id, title, image, description, user, vegLocation }) => (
  <Link to={`/vegetables/${_id}`}>
    <div className='vegCard'>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>description: {description}</p>
      <p>Location: {vegLocation}</p>
      <p>Posted by: {user.username}</p>
    </div>
  </Link>
)

export default VegetableCard