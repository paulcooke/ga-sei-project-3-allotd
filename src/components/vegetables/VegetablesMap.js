import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

// require('dotenv').config()
// import app from '../../../index'

class VegetablesMap extends React.Component {
  constructor() {
    super()

    this.state = { 
      vegetables: null,
      postcodes: []
    }
  }
  componentDidMount() {
    this.getData()
    
  }
  getData() {
    axios.get('/api/vegetables')
      .then(res => this.setState({ vegetables: res.data }))
      .catch(err => console.log(err))
      

  }
   
  getPostcodes() {
    const postcodes = this.state.vegetables.map(veg => veg.vegLocation.replace(' ', ''))

    axios.post('https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes/', { postcodes } )
         
      .then(res => {
        this.setState({ postcodes: res.data.result })
      })
      .catch(err => console.log(err))
  }


  render() {
    if (!this.state.vegetables) return null
    // console.log(this.state.vegetables)

    return (
      <main>
        <h2>

        </h2>
        <MapGL
          mapboxApiAccessToken={'pk.eyJ1IjoiY2xhaXJlc21pdGgiLCJhIjoiY2syN255N3hoMXBpcjNjbXFtd3BsM3lpOSJ9.AKF2QJycaXdGIQ6zvolN9A'}
          height={'100vh'}
          width={'100vw'}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          zoom={10}
          latitude={51.515}
          longitude={-0.078}

      
        >
          {this.getPostcodes()}
          {this.state.postcodes.map(postcode => (
            <Marker
              key={postcode.result.eastings}
              latitude={postcode.result.latitude}
              longitude={postcode.result.longitude}
            >
              <div>
                {this.state.vegetables.filter(veg => veg.vegLocation === postcode)}
                <Link to={`/vegetables/${this.state.vegetables._id}`}> 🍅 </Link> 
              </div>
              


            </Marker>

          ))}
     
        </MapGL>
      
      </main>
    )
  }
}

export default VegetablesMap