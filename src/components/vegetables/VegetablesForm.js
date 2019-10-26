import React from 'react'

const VegetablesForm = ( { vegetable: { title, typeOfVeg, varietyOfVeg, pickedDate, description, image, vegLocation }, handleSubmit, handleChange } ) => {
  return (
    <div className='formWrapper'>
      <form className='panelWrapper' onSubmit={(e) => handleSubmit(e)}>
        <h2>New Vegetable</h2>
        <label>Name</label>
        <input
          placeholder="Name"
          name="title"
          onChange={(e) => handleChange(e)}
          value={title}
        />
        <label>Type</label>
        <input
          placeholder="Type"
          name="typeOfVeg"
          onChange={(e) => handleChange(e)}
          value={typeOfVeg}
        />
        <label>Variety</label>
        <input
          placeholder="Variety"
          name="varietyOfVeg"
          onChange={(e) => handleChange(e)}
          value={varietyOfVeg}
        />
        <label>Date Picked</label>
        <input
          placeholder="DD/MM/YYYY"
          name="pickedDate"
          onChange={(e) => handleChange(e)}
          value={pickedDate}
        />
        <label>Image URL</label>
        <input
          placeholder='Image URL'
          name='image'
          onChange={(e) => handleChange(e)}
          value={image}
        />
        <label>Location</label>
        <input
          placeholder='Postcode'
          name='vegLocation'
          onChange={(e) => handleChange(e)}
          value={vegLocation}
        />
        <label>Description</label>
        <textarea
          rows='4'
          cols='5'
          type='textarea'
          placeholder="Description"
          name="description"
          onChange={(e) => handleChange(e)}
          value={description}
        />
        <button type="submit">
          submit
        </button>
      </form>
    </div>
  )
}

export default VegetablesForm