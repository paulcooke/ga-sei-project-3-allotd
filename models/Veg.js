const mongoose = require('mongoose')

const vegSchema = new mongoose.Schema({
  title: { type: String, required: true },
  typeOfVeg: { type: String, required: true },
  varietyOfVeg: { type: String },
  pickedDate: { type: Number, required: true },
  description: { type: String, maxlength: 200 },
  image: { type: String },
  isClaimed: { type: Boolean },
  vegLocation: { type: String, required: true },
  availablePickUpDays: { type: [String] },
  availablePickUpTimes: { type: [String] },
  //pickerId: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

vegSchema.virtual('pickUpAppointment', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'vegId'
})

vegSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

vegSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Veg', vegSchema)