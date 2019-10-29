/* global api, describe, it, expect, beforeEach, afterEach */
const Veg = require('../../models/Veg')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')


const testVeg = {
  
  title: 'Box of tomato',
  typeOfVeg: 'tomato',
  varietyOfVeg: 'cherry',
  pickedDate: 5,
  description: 'very sweet',
  image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
  isClaimed: false,
  vegLocation: 'SW18 4TQ',
  availablePickUpDays: ['Monday', 'Tuesday'],
  availablePickUpTimes: ['18', '19']
  
}

const testUserData =    {
  username: 'Lloyd',
  email: 'lloyd@email.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  availablePickUpDays: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ], 
  availablePickUpTimes: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ]
}

describe('POST /vegetables', () => {

  let token = null 

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post('/api/vegetables')
      .send(testVeg)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/vegetables')
      .set('Authorization', `Bearer ${token}`)
      .send(testVeg)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/vegetables')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })
  it('should return the correct fields', done => {
    api.post('/api/vegetables')
      .set('Authorization', `Bearer ${token}`)
      .send(testVeg)
      .end((err, res) => {
        expect(res.body).to.contain.keys([
          'title',
          'typeOfVeg',
          'varietyOfVeg',
          'pickedDate',
          'description',
          'image',
          'isClaimed',
          'vegLocation',
          'user'
        ])
        done()
      })
  })
  it('should return the correct data types', done => {
    api.post('/api/vegetables/')
      .set('Authorization', `Bearer ${token}`) 
      .send(testVeg)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.title).to.be.a('string')
        expect(res.body.typeOfVeg).to.be.a('string')
        expect(res.body.pickedDate).to.be.a('string')
        expect(res.body.description).to.be.a('string')
        expect(res.body.image).to.be.a('string')
        expect(res.body.isClaimed).to.be.a('boolean')
        expect(res.body.vegLocation).to.be.a('string')
        expect(res.body.user).to.be.an('object')
        done()
      })
  })

})