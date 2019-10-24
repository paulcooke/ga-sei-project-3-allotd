import React from 'react'
import { Link } from 'react-router-dom'

const VegetableCard = () => (
  <Link to="/vegetables/:id">
    <h1><em>i am a placeholder vegetable post card thingy. i link to the show page</em></h1>
  </Link>
)

export default VegetableCard