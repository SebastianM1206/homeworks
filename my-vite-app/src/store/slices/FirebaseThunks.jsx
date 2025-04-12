// src/redux/firebaseActions.js
import { database as db, ref, set, push, onValue } from "../../firebase/config";
import { setLoading, setData } from "./FirebaseSlice";

export const fetchFirebaseData = () => (dispatch) => {
  dispatch(setLoading());
  const dbRef = ref(db, "mensajes");

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setData(data ? Object.values(data) : []));
  });
};

export const addDataToFirebase = (newData) => (dispatch) => {
  const dbRef = ref(db, "mensajes");
  const newEntry = push(dbRef);
  set(newEntry, newData);
};
