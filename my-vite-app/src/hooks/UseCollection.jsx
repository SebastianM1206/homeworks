import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAll = async (condition) => {
    setError(null);
    let q;
    if (condition && condition.length === 3) {
      q = query(
        collection(db, table),
        where(condition[0], condition[1], condition[2])
      );
    } else {
      q = query(collection(db, table));
    }

    const resDoc = await getDocs(q);
    const docs = [];
    resDoc.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setResults(docs);
  };

  // agregar uno nuevo
  const add = async (docData) => {
    setError(null);
    setIsPending(true);
    try {
      const resDoc = await addDoc(collection(db, table), docData);
      setIsPending(false);
      return resDoc.id;
    } catch (err) {
      setError("could not add");
      setIsPending(false);
    }
  };

  // actualizando
  const update = async (id, newData) => {
    setError(null);
    setIsPending(true);
    try {
      const ref = doc(db, table, id);
      await updateDoc(ref, newData);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError("could not update");
      setIsPending(false);
    }
  };

  // eliminando un documento
  const remove = async (id) => {
    setError(null);
    setIsPending(true);
    try {
      const ref = doc(db, table, id);
      await deleteDoc(ref);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError("could not delete");
      setIsPending(false);
    }
  };

  return { results, isPending, error, getAll, add, update, remove };
};

export default useCollection;
