const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  selectedPickUpDay: { type: String },
  selectedPickUpTime: { type: String },
  appointmentStatus: { type: Boolean },
  vegId: { type: mongoose.Schema.ObjectId, ref: 'Veg', required: true },
  pickerId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  expiryDate: { type: String, required: true }
}, {
  timestamps: true
})

//Gets GrowerID from User based on Apointment _id in the User listingHistory
appointmentSchema.virtual('growerId', {
  ref: 'User',
  localField: '_id',
  foreignField: 'listingHistory'
})

appointmentSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

appointmentSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Appointment', appointmentSchema)