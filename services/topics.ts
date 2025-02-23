import { collection, doc, query, addDoc, deleteDoc, setDoc, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Topic } from "@/types";
import { showMsg } from "@/utils/showMessage";

const _collection = collection(db, "topics");

// returns [values, loading, error, snapshot]
export const useTopicsData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);
  // let query = buildQuery(queryObject);

  const [ value, loading, error, snapshot ] = useCollectionData(_query);

  return [ value, loading, error, snapshot! ];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleTopicData = (id: string) => {
  const document = doc(db, "topics", id);

  const [ snapshot, loading, error ] = useDocumentData(document);

  return [ snapshot, loading, error ];
};


// Add a new document with a generated ID
export const createTopic = async (data: Topic) => {
  // Add a new document with a generated id.
  try {
    const newDocRef = await addDoc(_collection, data);
    
    return newDocRef?.id;
    
  } catch {
    throw new Error("Error creating the topic");
  }
}


// Update an existing document
export const updateTopic = async (id: string, data: Topic | DocumentData) => {
  const topicDoc = doc(db, "topics", id);
  // Set the data of the document
  try {
    await setDoc(topicDoc, data);
    
  } catch {
    throw new Error("Error updating the topic");
  }
}


// Delete the document
export const deleteTopic = async (id: string) => {
  // Assuming 'db' is the Firestore instance
  const topicDoc = doc(db, "topics", id);
  
  // Delete the document
  try {
    await deleteDoc(topicDoc);
    showMsg("Topic deleted", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}
