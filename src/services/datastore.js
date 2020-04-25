import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBA_AjK7-pbyspxAie1_tggD-qiEFYGlhA',
  authDomain: 'reactnotes-32cbb.firebaseapp.com',
  databaseURL: 'https://reactnotes-32cbb.firebaseio.com',
  projectId: 'reactnotes-32cbb',
  storageBucket: 'reactnotes-32cbb.appspot.com',
  messagingSenderId: '107241104319',
  appId: '1:107241104319:web:cc75e5aeaad428a62e770a',
  measurementId: 'G-T1M7QNRXRK',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

// eslint-disable-next-line import/prefer-default-export
export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function createNote(newNote) {
  database.ref('notes').push(newNote);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(updates, id) {
  firebase.database().ref('notes').child(id).update(updates);
}
