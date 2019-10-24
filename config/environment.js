const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost/allotted-${env}`
const port = 4000
const secret = 'very secret'

module.exports = { dbURI, port, secret }