import React from 'react'
import MapGL, { Popup, GeolocateControl, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import { Link } from 'react-router-dom'


class VegetablesMap extends React.Component {
  constructor() {
    super()

    this.state = { 
      vegetables: null,
      postcodes: [],

      viewport: {
        latitude: 51.515,
        longitude: -0.078,
        zoom: 12
      },
      showPopup: true
    }
    this.mapRef = React.createRef()
    
  }
  
  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    this.getPostcodes()
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
    const { showPopup } = this.state
    return (
      <main>
        <MapGL
          mapboxApiAccessToken={'pk.eyJ1IjoiY2xhaXJlc21pdGgiLCJhIjoiY2syN255N3hoMXBpcjNjbXFtd3BsM3lpOSJ9.AKF2QJycaXdGIQ6zvolN9A'}
          height={'100vh'}
          width={'100vw'}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          scrollZoom={true}
          minZoom={0}
          maxZoom={20}
          touchZoom={true}
          

          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}>

          <GeolocateControl 
            positionOptions={{ enableHighAccuracy: true, timeOut: 6000 }}
            showUserLocation={true}
            trackUserLocation={false}
            
          />


          {this.state.postcodes.map(postcode => (
            <>
              {showPopup && <Popup
                key={postcode.result.eastings}
                latitude={postcode.result.latitude}
                longitude={postcode.result.longitude}
                closeButton={false}
                closeOnClick={true}
                tipSize={12}
                sortByDepth={true}
                // onClose={() => this.setState({ showPopup: false })}
                anchor="bottom" >
                 

                {this.state.vegetables.map(veg => 
                  <div key ={veg.title}> 
                    {veg.vegLocation.replace(' ', '') === postcode.query ? <Link  to={`/vegetables/${veg._id}`}>   
                      {veg.title} {veg.vegLocation} 🍅</Link>  : null}
                 
                  </div>)}
              
              </Popup>}
         
            </>
          ))}
          
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl />
          </div>
        
     
        </MapGL>
      
      </main>
    )
  }
}

export default VegetablesMap