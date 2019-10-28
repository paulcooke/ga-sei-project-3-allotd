const mongoose = require('mongoose')

const vegSchema = new mongoose.Schema({
  title: { type: String, required: true },
  typeOfVeg: { type: String, required: true },
  varietyOfVeg: { type: String },
  pickedDate: { type: String, required: true },
  description: { type: String, maxlength: 200 },
  image: { type: String },
  isClaimed: { type: Boolean },
  vegLocation: { type: String, required: true },
  availablePickUpDays: { type: [String] },
  availablePickUpTimes: { type: [String] },
  pickUpAppointment: { type: mongoose.Schema.ObjectId, ref: 'Appointment', autopopulate: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, autopopulate: true  }
}, {
  timestamps: true
})

// //Creates pickUpAppointment virtual field
// //the function goes to 'Appointment' VegId
// //and checks if VegId is the same as the 'Veg' _id
// //if yes it adds the Appointment to 'pickUpAppointment'
// vegSchema.virtual('pickUpAppointment', {
//   ref: 'Appointment',
//   localField: '_id',
//   foreignField: 'vegId'
// })


// vegSchema.set('toJSON', {
//   virtuals: true,
//   transform(doc, json) {
//     delete json.password
//     delete json.email
//     return json
//   }
// })

vegSchema.plugin(require('mongoose-unique-validator'))
vegSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Veg', vegSchema)