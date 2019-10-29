const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({  
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})



const appointmentSchema = new mongoose.Schema({
  selectedPickUpDay: { type: String },
  selectedPickUpTime: { type: String },
  appointmentStatus: { type: String },
  appointmentDateandTime: { type: Date },
  vegId: { type: mongoose.Schema.ObjectId, ref: 'Veg', autopopulate: true },
  pickerId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, autopopulate: true },
  expiryDate: { type: String, required: true }, // this needs to be pased in insomnia as an empty string it gets populated outomatically in controllers/appointments.js in function create where 48 hours (172800 * 1000) are added to the current Date.
  messages: [messageSchema]
}, {
  timestamps: true
})



//Creates GrowerID as a virtual fiels in appointmentSchema
//The function goes to models/User.js with the Appointment.js _id (so the id of the given appointment)
//it juns through the VEGETABLE objects in listing history looking
//for a vegetable associated with this appointment ID
//if it finds one it takes the only USER SCHEMA associated with
//the vegetable object and adds it to the growerId

// appointmentSchema.virtual('growerId', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'listingHistory'
// })


// appointmentSchema.virtual('vegId', {
//   ref: 'Veg',
//   localField: '_id',
//   foreignField: 'pickUpAppointment'
// })

appointmentSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

appointmentSchema.plugin(require('mongoose-unique-validator'))
appointmentSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model('Appointment', appointmentSchema)