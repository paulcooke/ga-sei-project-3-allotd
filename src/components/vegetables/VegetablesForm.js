import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import ImageUpload from '../images/ImageUpload'

const animatedComponents = makeAnimated()

const VegetablesForm = ( { vegetable: { title, typeOfVeg, varietyOfVeg, pickedDate, description, image, vegLocation, availablePickUpDays, availablePickUpTimes }, handleSubmit, handleChange, handleTimeSelect, handleDaySelect, dayOptions, timeOptions, errors } ) => {
  return (
    <div className='formWrapper'>
      <form className='panelWrapper' onSubmit={(e) => handleSubmit(e)}>
        <h2>New Vegetable</h2>
        <label>Name</label>
        <input
          placeholder={errors.title ? 'This field is required.' : 'Name'} 
          name='title'
          onChange={(e) => handleChange(e)}
          value={title}
        />
        <label>Type</label>
        <input
          placeholder={errors.typeOfVeg ? 'This field is required.' : 'Type'} 
          name='typeOfVeg'
          onChange={(e) => handleChange(e)}
          value={typeOfVeg}
        />
        <label>Variety</label>
        <input
          placeholder='Variety'
          name='varietyOfVeg'
          onChange={(e) => handleChange(e)}
          value={varietyOfVeg}
        />
        <label>Date Picked</label>
        <input
          placeholder={errors.pickedDate ? 'This field is required. Please fill in DD/MM/YYYY' : 'DD/MM/YYYY'} 
          name='pickedDate'
          onChange={(e) => handleChange(e)}
          value={pickedDate}
        />
        <ImageUpload />
        <input hidden id='imgurl' name='image' value={image} onChange={(e) => handleChange(e)} />

        <label>Location</label>
        <input
          placeholder={errors.pickedDate ? 'This field is required. Please fill in your postcode.' : 'Postcode'} 
          name='vegLocation'
          onChange={(e) => handleChange(e)}
          value={vegLocation}
        />
        <label>Description</label>
        <textarea
          rows='4'
          cols='5'
          type='textarea'
          placeholder='Description'
          name='description'
          onChange={(e) => handleChange(e)}
          value={description}
        />

        <label>Set your preferences for when you would like people to collect from you</label>
        <Select 
          name='availablePickUpDays'
          options={dayOptions}
          isMulti
          onChange={handleDaySelect}
          components={animatedComponents}
          value={availablePickUpDays &&
            availablePickUpDays.map(day => (
              { value: day, label: day }
            ))
          }
        />
        <br/>
        <Select 
          options={timeOptions}
          isMulti
          onChange={handleTimeSelect}
          components={animatedComponents}
          value={availablePickUpTimes &&
            availablePickUpTimes.map(time => (
              { value: time, label: time + ':00' }
            ))
          }
        />

        <button type='submit'>
          submit
        </button>
      </form>
    </div>
  )
}

export default VegetablesForm