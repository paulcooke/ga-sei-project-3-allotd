/* global api, describe, it, expect, beforeEach, afterEach */

const Veg = require('../../models/Veg')
const User = require('../../models/User')

describe('GET /vegetables/:id', () => {

  // eslint-disable-next-line prefer-const
  let vegetable = null

  beforeEach(done => {
    User.create({
      username: 'Claire',
      email: 'claire@email.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        return Veg.create([
          {
            title: 'tomato',
            typeOfVeg: 'fruit',
            varietyOfVeg: 'cherry',
            pickedDate: 5,
            description: 'very sweet',
            image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
            isClaimed: false,
            vegLocation: 'SW18 4TQ',
            user: user
          },
          {
            title: 'cucumber',
            typeOfVeg: 'gourd',
            varietyOfVeg: 'armenian',
            pickedDate: 8,
            description: 'mmmmm so juicy',
            image: 'https://www.edenbrothers.com/store/media/Seeds-Vegetables/resized/SVCUC124-1_medium.jpg',
            isClaimed: false,
            vegLocation: 'SW11 1XT',
            user: user
          },
          {
            title: 'aubergine',
            typeOfVeg: 'gourd',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'Full of flavour and quite large. ',
            image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
            isClaimed: false,
            vegLocation: 'SW13 9PF',
            user: user
          },
          {
            title: 'Asparagus',
            typeOfVeg: 'Asparagus',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'beautiful colour...',
            image: 'https://www.thespruce.com/thmb/AslNxNSnIywOCJuM4fcUAU7VWBA=/1983x1416/filters:fill(auto,1)/Asparagus-GettyImages-135630192-5be349fcc9e77c0051aac6ea.jpg',
            isClaimed: false,
            vegLocation: 'SW12 8RJ',
            user: user
          }
        ])
      })
      .then(createdVeg => {
        vegetable = createdVeg[0]
        done()
      })
  })
  afterEach(done =>{
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })

  it('should return a 404 not found for an invalid animal id', done => {
    api.get('/api/vegetables/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/vegetables/${vegetable._id}`) // <=== and using that animal we have created and stored in the requests
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  }) 

  it('should return an object', done => {
    api.get(`/api/vegetables/${vegetable._id}`) // <=== and using that animal we have created and stored in the requests
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  }) 
  it('should return the correct fields', done => {
    api.get(`/api/vegetables/${vegetable._id}`) 
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
    api.get(`/api/vegetables/${vegetable._id}`) 
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