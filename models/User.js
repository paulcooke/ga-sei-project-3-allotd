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
  rating: { type: Number }
}, {
  timestamps: true
})

//Creates listingHistory virtual field in userSchema
//The function goes to 'Veg' model with the User.js _id.
//if User.js '_id' is equal to the Veg.js 'user' 
//then 'listingHistory' in 'User' is populated with that 'Veg' object. 
//So the whole vegetable with all its referenced and virtual fields is attached. 
userSchema.virtual('listingHistory', {
  ref: 'Veg',
  localField: '_id',
  foreignField: 'user'
})

//Creates pickedVegHistory virtual field in userSchema
//the function goes to 'Appointment' object finds pickerId 
//and checks if the pickerId is the same as the User _id if yes
//It adds the 'Appointment' to the 'pickedVegHistory
userSchema.virtual('pickedVegHistory', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'pickerId'
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