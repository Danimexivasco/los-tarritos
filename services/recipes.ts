import { collection, doc, query, addDoc, deleteDoc, setDoc, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Recipe } from "@/types";
import { showMsg } from "@/utils/showMessage";

const _collection = collection(db, "recipes");

// returns [values, loading, error, snapshot]
export const useRecipesData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);
  // let query = buildQuery(queryObject);

  const [ value, loading, error, snapshot ] = useCollectionData(_query);

  return [ value, loading, error, snapshot! ];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleRecipeData = (id: string) => {
  const document = doc(db, "recipes", id);

  const [ snapshot, loading, error ] = useDocumentData(document);

  return [ snapshot, loading, error ];
};


// Add a new document with a generated ID
export const createRecipe = async (data: Recipe) => {
  // Add a new document with a generated id.
  try {
    await addDoc(_collection, data);
    showMsg("Recipe created", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


// Update an existing document
export const updateRecipe = async (id: string, data: Recipe | DocumentData) => {
  const recipeDoc = doc(db, "recipes", id);
  // Set the data of the document
  try {
    await setDoc(recipeDoc, data);
    showMsg("Recipe updated", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


// Delete the document
export const deleteRecipe = async (id: string) => {
  // Assuming 'db' is the Firestore instance
  const recipeDoc = doc(db, "recipes", id);
  
  // Delete the document
  try {
    await deleteDoc(recipeDoc);
    showMsg("Recipe deleted", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}
