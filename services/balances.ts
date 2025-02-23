import { collection, doc, query, addDoc, deleteDoc, setDoc, QuerySnapshot, DocumentData, CollectionReference, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Balance } from "@/types";
import { showMsg } from "@/utils/showMessage";

const _collection: CollectionReference<DocumentData> = collection(db, "balances");

// returns [values, loading, error, snapshot]
export const useBalancesData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);
  // let query = buildQuery(queryObject);

  const [ value, loading, error, snapshot ] = useCollectionData(_query);

  return [ value, loading, error, snapshot! ];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleBalanceData = (id: string) => {
  const document = doc(db, "balances", id);

  const [ snapshot, loading, error ] = useDocumentData(document);

  return [ snapshot, loading, error ];
};


// Add a new document with a generated ID
export const createBalance = async (data: Balance) => {
  // Add a new document with a generated id.
  try {
    const newDocRef = await addDoc(_collection, data);

    return newDocRef?.id;
  } catch {
    throw new Error("Error creating the balance");
  }
}


// Update an existing document
export const updateBalance = async (id: string, data: Balance | DocumentData) => {
  const balanceDoc = doc(db, "balances", id);
  // Set the data of the document
  try {
    await setDoc(balanceDoc, data);
    
  } catch {
    throw new Error("Error updating the balance");
  }
}

// export const useSingleBalanceData = (id: string, year: number | string) => {
//   const _query = query(_collection);

//   const [ value, loading, error, snapshot ] = useCollectionData(_query);
//   const matchedBalance = value
//     ?.filter(balances => Number(balances.year) === Number(year))?.[ 0 ]?.balances
//     ?.find(balance => balance.id === id);
//   return [ matchedBalance, loading, error, snapshot! ];
// };


// // Add a new document with a generated ID
// export const createBalance = async (year: number, data: Balance, snapshot: QuerySnapshot) => {
//   const matchedDoc = snapshot?.docs.find(doc => doc.data().year === year);
//   if (matchedDoc) {
//     const docRef = doc(_collection, matchedDoc.id);
//     try {
//       await updateDoc(docRef, {
//         balances: arrayUnion(data)
//       });
//       showMsg("Balance created", "success");
//     } catch {
//       showMsg("Something went wrong", "error");
//     }
//     return;
//   }
//   try {
//     await addDoc(_collection, {
//       year: year,
//       balances: [ data ]
//     });
//     showMsg("Balance created", "success")
//   } catch {
//     showMsg("Something went wrong", "error")
//   }
// }


// // Update an existing document
// export const updateBalance = async (id: string, year: string | number, data: Balance | DocumentData, snapshot: QuerySnapshot) => {
//   const matchedDoc = snapshot?.docs.find(doc => doc.data().year === year);
//   if (matchedDoc) {
//     const docRef = doc(_collection, matchedDoc.id);
//     try {
//       // Get the current balances
//       const currentBalances = matchedDoc.data().balances;

//       // Update the specific balance
//       const updatedBalances = currentBalances.map(balance =>
//         balance.id === id ? { ...balance, ...data } : balance
//       );

//       // Update the document with the modified balances array
//       await updateDoc(docRef, { balances: updatedBalances });
//       showMsg("Balance updated", "success");
//     } catch {
//       showMsg("Something went wrong", "error");
//     }
//     return;
//   }
// }


// Delete the document
export const deleteBalance = async (id: string) => {
  // Assuming 'db' is the Firestore instance
  const balanceDoc = doc(db, "balances", id);
  
  // Delete the document
  try {
    await deleteDoc(balanceDoc);
    showMsg("Balance deleted", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}
