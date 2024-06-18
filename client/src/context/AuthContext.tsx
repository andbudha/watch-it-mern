import { ReactNode, createContext, useState } from 'react';
import {
  LoginValues,
  SignupValueTypes,
  UserResponse,
} from '../types/common_types';
import { dataBase, auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { successfulToast } from '../assets/utils/successfulToast';
import { FirebaseError } from 'firebase/app';
import { generateFirebaseErrorInstance } from '../assets/utils/failedToast';
import { doc, setDoc } from 'firebase/firestore';

type AuthContextType = {
  isLoading: boolean;
  signupEmailInputValue: string;
  signupPasswordInputValue: string;
  user: UserResponse | undefined;
  registerUser: (signUpValues: SignupValueTypes) => Promise<void>;
  logInUser: (logInValues: LoginValues) => Promise<void>;
  logOutUser: () => Promise<void>;
  setSignupEmailInputValue: (newSignupEmailInputValue: string) => void;
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) => void;
  stayLoggedIn: () => void;
  setIsLoading: (newLoadingStatus: boolean) => void;
};

const authInitialContextState = {
  isLoading: false,
  signupEmailInputValue: '',
  signupPasswordInputValue: '',
  user: {} as UserResponse,
  setSignupEmailInputValue: (newSignupEmailInputValue: string) =>
    newSignupEmailInputValue,
  setSignupPasswordInputValue: (newSignupPasswordInputValue: string) =>
    newSignupPasswordInputValue,
  registerUser: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  logOutUser: () => Promise.resolve(),
  stayLoggedIn: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
  setIsLoading: () => {
    throw new Error('An error occurred when refreshing the app page!');
  },
} as AuthContextType;

export const AuthContext = createContext(authInitialContextState);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [signupEmailInputValue, setSignupEmailInputValue] =
    useState<string>('');
  const [signupPasswordInputValue, setSignupPasswordInputValue] =
    useState<string>('');

  const registerUser = async (signUpValues: SignupValueTypes) => {
    setIsLoading(true);
    try {
      const signUpResponse = await createUserWithEmailAndPassword(
        auth,
        signUpValues.email,
        signUpValues.password
      );
      if (signUpResponse) {
        if (auth.currentUser) {
          await setDoc(doc(dataBase, 'users', auth.currentUser.uid), {
            email: auth.currentUser.email,
            movieList: [],
          });
        }
        successfulToast('User created and logged in successfully!');
        setSignupEmailInputValue('');
        setSignupPasswordInputValue('');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        generateFirebaseErrorInstance(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logInUser = async (logInValues: LoginValues) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        logInValues.email,
        logInValues.password
      );
      console.log(response);

      if (response) {
        successfulToast('Logged in successfully!');
        setUser({ email: response.user.email, userID: response.user.uid });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        generateFirebaseErrorInstance(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const logOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      successfulToast('Logged out successfully!');
      setUser(undefined);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        generateFirebaseErrorInstance(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stayLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email, userID: user.uid });
      } else {
        setUser(undefined);
      }
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        registerUser,
        logInUser,
        logOutUser,
        signupEmailInputValue,
        signupPasswordInputValue,
        setSignupEmailInputValue,
        setSignupPasswordInputValue,
        stayLoggedIn,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
