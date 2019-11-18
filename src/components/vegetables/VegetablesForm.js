import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'

import ImageUpload from '../images/imageUpload'

const animatedComponents = makeAnimated()

const VegetablesForm = ( { vegetable: { title, varietyOfVeg, pickedDate, description, image, vegLocation, availablePickUpDays, availablePickUpTimes }, handleSubmit, handleChange, handleTimeSelect, handleDaySelect, dayOptions, timeOptions, errors, components, handleVegType, options } ) => {
  return (
    <div className='vegFormWrap'>
      <div className='formWrapperVeg'>
        <form className='panelWrapperVeg' onSubmit={(e) => handleSubmit(e)}>
          <h2>New Vegetable</h2>
          <label>Name<span>*</span></label>
          <input
            placeholder={errors.title ? 'This field is required.' : 'Name'} 
            name='title'
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <label>Type<span>*</span></label>
          <div className='input-select'>
            <CreatableSelect
              isClearable
              placeholder={errors.typeOfVeg ? 'This field is required.' : 'Click here to select or start typing'} 
              onChange={handleVegType}
              components={components}
              options={options}
            />
          </div>
          <label>Variety</label>
          <input
            placeholder='Variety'
            name='varietyOfVeg'
            onChange={(e) => handleChange(e)}
            value={varietyOfVeg}
          />
          <label>Date Picked<span>*</span></label>
          <input
            placeholder={errors.pickedDate ? 'This field is required. Please fill in DD/MM/YYYY' : 'DD/MM/YYYY'} 
            name='pickedDate'
            onChange={(e) => handleChange(e)}
            value={pickedDate}
          />
          <ImageUpload />
          <input hidden id='imgurl' name='image' value={image} onChange={(e) => handleChange(e)}/>
          <label>Location<span>*</span></label>
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
          <div className='input-select'>
            <Select 
              name='availablePickUpDays'
              placeholder='Select day(s) you are available'
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
          </div>
          <br/>
          <div className='input-select'>
            <Select 
              options={timeOptions}
              placeholder='Select time you are available'
              isMulti
              onChange={handleTimeSelect}
              components={animatedComponents}
              value={availablePickUpTimes &&
            availablePickUpTimes.map(time => (
              { value: time, label: time + ':00' }
            ))
              }
            />
          </div>
          <button type='submit'>
          Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default VegetablesForm