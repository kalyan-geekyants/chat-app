importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBA5NMI3gGCgn7_WAwk4EcR8gjqFqnBusM",
  authDomain: "push-notifications-1c006.firebaseapp.com",
  projectId: "push-notifications-1c006",
  storageBucket: "push-notifications-1c006.appspot.com",
  messagingSenderId: "255882195367",
  appId: "1:255882195367:web:5d5fb039d5561cda034682",
  measurementId: "G-W0JFEFGY29",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
