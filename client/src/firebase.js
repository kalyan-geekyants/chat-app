// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const VAP_KEY =
  "BBFpZ5Ii-rHpr8IzafUSX73ruY09ADhLM6DdcgP0Prpg1qwLRKZvQefEsLYn5h6PzHjqyYHPUpBdWfWoMaMHBOA";

const firebaseConfig = {
  apiKey: "AIzaSyBA5NMI3gGCgn7_WAwk4EcR8gjqFqnBusM",
  authDomain: "push-notifications-1c006.firebaseapp.com",
  projectId: "push-notifications-1c006",
  storageBucket: "push-notifications-1c006.appspot.com",
  messagingSenderId: "255882195367",
  appId: "1:255882195367:web:5d5fb039d5561cda034682",
  measurementId: "G-W0JFEFGY29",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getUserToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: VAP_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default firebaseApp;
