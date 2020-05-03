import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyAtNX2yvalvqYbvbAWH1fHBu1RIa30BPKg",
  authDomain: "pwakurzus.firebaseapp.com",
  databaseURL: "https://pwakurzus.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
