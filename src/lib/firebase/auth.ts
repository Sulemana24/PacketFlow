import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
  signInAnonymously,
} from "./config";

// Helper function to extract error message from unknown error
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unexpected error occurred";
};

// Email/Password Sign Up
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// GitHub Sign In
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Guest Sign In (Anonymous)
export const signInAsGuest = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: getErrorMessage(error) };
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

// Sign Out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

// Auth State Observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
