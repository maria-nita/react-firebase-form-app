import firebase from 'firebase'

 // Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBvqGvK6B7qbM6dzHN75Kj_-ffI0nF31-4",
authDomain: "earthblox-form-challenge-a80ef.firebaseapp.com",
databaseURL: "https://earthblox-form-challenge-a80ef.firebaseio.com",
projectId: "earthblox-form-challenge-a80ef",
storageBucket: "earthblox-form-challenge-a80ef.appspot.com",
messagingSenderId: "211453973485",
appId: "1:211453973485:web:cc95b7ab60a0c8180f8de4",
measurementId: "G-S984RV6SNG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;