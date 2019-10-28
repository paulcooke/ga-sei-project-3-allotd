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
  apiKey: "AIzaSyCXrou7TUOFltSGXe6H01w5db7ipFkMt9Y",
  authDomain: "alloted-82773.firebaseapp.com",
  databaseURL: "https://alloted-82773.firebaseio.com",
  projectId: "alloted-82773",
  storageBucket: "alloted-82773.appspot.com",
  messagingSenderId: "659366657542",
  appId: "1:659366657542:web:8e2fc02d5aa221dc454d87"
}

firebase.initializeApp(firebaseConfig)

var storage = firebase.storage()

export {
  storage, firebase as default
}