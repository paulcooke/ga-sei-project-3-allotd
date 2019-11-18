const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/allotted-${env}`
const port = process.env.PORT
const secret = 'very secret'

module.exports = { dbURI, port, secret }