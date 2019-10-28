import firebase from 'firebase/app'
import 'firebase/storage'

// const apiKey = process.env.FIREBASE_API_KEY
// const authDomain = process.env.FIREBASE_AUTH_DOMAIN
// const databaseURL = process.env.FIREBASE_DATABASE_URL
// const projectId = process.env.FIREBASE_PROJECT_ID
// const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
// const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID
// const appId = process.env.FIREBASE_APP_ID

// var firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   databaseURL: databaseURL,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId, 
//   appId: appId
// }

var firebaseConfig = {
//PASTE HERE
}

firebase.initializeApp(firebaseConfig)

var storage = firebase.storage()

export {
  storage, firebase as default
}