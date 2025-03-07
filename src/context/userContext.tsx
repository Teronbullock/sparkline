'use client';

import { createContext, useState, useCallback, useReducer } from 'react';
import apiFetch from '@/utils/fetch';

interface Ilogin {
  email: string;
  password: string;
}

interface UserInterface {
  currentUser: object | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<object | null>>;
  tokenInfo: string | null;
  setTokenInfo: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  login?: (credentials: Ilogin) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserInterface>({
  currentUser: null,
  setCurrentUser: () => null,
  tokenInfo: null,
  setTokenInfo: () => null,
  isLoggedIn: null,
  setIsLoggedIn: () => null,
  login: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
        userSlug: action.payload.userSlug,
        token: action.payload.token,
        tokenExpTIme: action.payload.tokenExpTIme,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        userSlug: null,
        token: null,
        tokenExpTIme: null,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [tokenInfo, setTokenInfo] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  const [state, dispatch] = useReducer(authReducer, {
    userId: null,
    userSlug: null,
    token: null,
    tokenExpTIme: null,
  });

  const login = useCallback(async ({ email, password }: Ilogin) => {
    try {
      const res = await apiFetch({ url: '/api/user/login', method: 'post', data: { email, password } });
      console.log('test context login', res);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }, []);

  const value: UserInterface = {
    currentUser,
    setCurrentUser,
    tokenInfo,
    setTokenInfo,
    isLoggedIn,
    setIsLoggedIn,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
