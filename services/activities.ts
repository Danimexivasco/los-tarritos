import { collection, doc, query, addDoc, deleteDoc, setDoc, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Activity } from "@/types";
import { showMsg } from "@/utils/showMessage";

const _collection = collection(db, "activities");

// returns [values, loading, error, snapshot]
export const useActivitiesData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);
  // let query = buildQuery(queryObject);

  const [ value, loading, error, snapshot ] = useCollectionData(_query);

  return [ value, loading, error, snapshot! ];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleActivityData = (id: string) => {
  const document = doc(db, "activities", id);

  const [ snapshot, loading, error ] = useDocumentData(document);

  return [ snapshot, loading, error ];
};


// Add a new document with a generated ID
export const createActivity = async (data: Activity) => {
  // Add a new document with a generated id.
  try {
    await addDoc(_collection, data);
    showMsg("Activity created", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


// Update an existing document
export const updateActivity = async (id: string, data: Activity | DocumentData) => {
  const activityDoc = doc(db, "activities", id);
  // Set the data of the document
  try {
    await setDoc(activityDoc, data);
    showMsg("Activity updated", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


// Delete the document
export const deleteActivity = async (id: string) => {
  // Assuming 'db' is the Firestore instance
  const activityDoc = doc(db, "activities", id);
  
  // Delete the document
  try {
    await deleteDoc(activityDoc);
    showMsg("Activity deleted", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}
