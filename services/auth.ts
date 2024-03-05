import {
  useSignInWithEmailAndPassword as _useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword as _useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail as _useSendPasswordResetEmail,
  useAuthState as _useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { showMsg } from "@/utils/showMessage";

// returns [user, loading, error]
export const useAuthState = () => _useAuthState(auth);

export const createUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    showMsg(e.message, "error")
    throw new Error(e)
  }
};
export const logIn = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    showMsg(e.message, "error")
    throw new Error(e.message)
  }
}

export const logOut = async () => {
  return await auth.signOut()
}