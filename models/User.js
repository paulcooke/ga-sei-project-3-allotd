//24/10/19 - JJ added regex to email 
//26/10/19 - JJ added virtual field for listed Veg history

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'] }, //regex test added to email - jj
  password: { type: String, required: true }, 
  userImage: { type: String }, 
  availablePickUpDays: { type: [String] }, 
  availablePickUpTimes: { type: [String] },
  userLocation: { type: String }, 
  vegGrown: { type: [String] },
  vegLookingFor: { type: [String] },
  rating: { type: Number },
  //listingHistory: { type: mongoose.Schema.ObjectId, ref: 'Veg' },
  appointmentHistory: [ { type: mongoose.Schema.ObjectId, ref: 'Appointment' } ]

}, {
  timestamps: true
})

// a virtual getter to show the vegetables created by this user
userSchema.virtual('listingHistory', {
  ref: 'Veg',
  localField: '_id',
  foreignField: 'user'
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) { // this happens before the password is saved
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, 
        bcrypt.genSaltSync(8)) //reassign as a hash of itself
    }
    next()
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)