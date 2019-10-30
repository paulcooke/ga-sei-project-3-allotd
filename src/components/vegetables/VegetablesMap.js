import React from 'react'
import MapGL, { Popup, NavigationControl, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchForm from '../common/SearchForm'

class VegetablesMap extends React.Component {
  constructor() {
    super()

    this.state = { 
      vegetables: null,
      postcodes: [],
      searchTerm: '',

      viewport: {
        latitude: 51.5176,
        longitude: -0.1145,
        zoom: 11
      },
      showPopup: true
    }
    this.mapRef = React.createRef()
    this.onChange = this.onChange.bind(this)
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
        // console.log(res.data.result)
        const filteredArr = res.data.result.filter(data => new RegExp(this.state.searchTerm, 'i').test(data.query))
        this.setState({ postcodes: filteredArr })
      })
      .catch(err => console.log(err))
  }

  onChange({ target: { name, value, dataset, innerHTML } }) {
    console.log('onchange was called. ')
    value ? this.setState({ [name]: value }) : this.setState({ [dataset.name]: (value || innerHTML) })
  }

  render() {
    if (!this.state.vegetables) return null
    const { showPopup } = this.state
    return (
      <main>
        <SearchForm
          name='searchTerm'
          onChange={this.onChange}
          onSubmit={this.submitSearch}
        />
        <MapGL
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
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

            <div key={postcode.result.eastings}>
              {showPopup && <Popup
                
                latitude={postcode.result.latitude}
                longitude={postcode.result.longitude}
                closeButton={false}
                closeOnClick={true}
                tipSize={12}
                sortByDepth={true}
                // onClose={() => this.setState({ showPopup: false })}
                anchor="bottom" >
                 

                {this.state.vegetables.map(veg => 
                  <div key ={veg._id}> 
                    {veg.vegLocation.replace(' ', '') === postcode.query ? <Link  to={`/vegetables/${veg._id}`}>   
                      {veg.title} {veg.vegLocation} 🍅</Link>  : null}
                 
                  </div>)}
              
              </Popup>}
         
            </div>
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