import React, { useEffect, useState } from "react";
import { getUserToken, onMessageListener } from "../../firebase";
import ToastMessage from "./ToastMessage";


function PushNotifications() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState(null);
  const [show,setShow] = useState(false);

  useEffect(() => {
    getUserToken(setTokenFound);

    // inside the jsx being returned:
  }, []);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div>
      {show && notification && <ToastMessage setShow={setShow}  show={show} title={notification.title} message={notification.body} />}
      {isTokenFound && "Notification permission enabled 👍🏻 "}
      {!isTokenFound && "Need notification permission ❗️"}
    </div>
  );
}

export default PushNotifications;
