const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  selectedPickUpDay: { type: String },
  selectedPickUpTime: { type: String },
  appointmentStatus: { type: Boolean },
  //vegId: { type: mongoose.Schema.ObjectId, ref: 'Veg' },
  //growerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  pickerId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

appointmentSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Appointment', appointmentSchema)