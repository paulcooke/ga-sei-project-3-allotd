/* global api, describe, it, expect, beforeEach, afterEach */

const Veg = require('../../models/Veg')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{
  username: 'test',
  email: 'test@email.com',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email.com',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('PUT /vegetables/:id', () => {
  // eslint-disable-next-line prefer-const
  let token = null 
  const incorrectToken = null
  // eslint-disable-next-line prefer-const
  let vegetable = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        return Veg.create({
          
          title: 'tomato',
          typeOfVeg: 'fruit',
          varietyOfVeg: 'cherry',
          pickedDate: 5,
          description: 'very sweet',
          image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
          isClaimed: false,
          vegLocation: 'SW18 4TQ',
          user: users[0]
          
        })
      })
      .then(createdVeg => {
        vegetable = createdVeg
        done()
      })
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/vegetables/${vegetable._id}`)
      
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 repose with a token', done => {
    api.put(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send( { name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
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
    api.put(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
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
  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})