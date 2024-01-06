import  { createContext, useState } from 'react';

interface UserInterface {
  currentUser: object | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<object | null>>;
  tokenInfo: string | null;
  setTokenInfo: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const UserContext = createContext<UserInterface>({
  currentUser: null,
  setCurrentUser: () => null,
  tokenInfo: null,
  setTokenInfo: () => null,
  isLoggedIn: null,
  setIsLoggedIn: () => null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [tokenInfo, setTokenInfo] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  const value: UserInterface = { 
    currentUser, 
    setCurrentUser,
    tokenInfo,
    setTokenInfo, 
    isLoggedIn,
    setIsLoggedIn,
  };
  
  return (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);
};