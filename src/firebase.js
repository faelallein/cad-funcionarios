import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyC1UnKBCPqGhmnHvetVCx00wN1cu0GYI0w",
    authDomain: "cad-funcionarios-32b7f.firebaseapp.com",
    databaseURL: "https://cad-funcionarios-32b7f.firebaseio.com",
    projectId: "cad-funcionarios-32b7f",
    storageBucket: "cad-funcionarios-32b7f.appspot.com",
    messagingSenderId: "850092813378",
    appId: "1:850092813378:web:766be8b7fd8e3c077151db"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;