import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'src/utils/firebase';

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Define context type
interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => Promise.resolve() // Placeholder logout function
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const { displayName, email, photoURL } = firebaseUser;
        setUser({ displayName, email, photoURL });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(() => {
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        // console.error('Error logging out:', error);
        // Handle logout error (optional)
      } finally {
        setUser(null);
        setLoading(true);
      }
    };
    return { user, loading, logout };
  }, [user, loading]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
