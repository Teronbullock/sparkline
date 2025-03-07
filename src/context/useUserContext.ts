import { useContext } from 'react';
import { UserContext } from './userContext';

/**
 * -- Custom hook to use the AuthContext --
 * @returns The AuthContext object
 */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};
