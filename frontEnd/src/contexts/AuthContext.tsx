import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "../services/api";

export interface Customer {
  id: number;
  googleId: string;
  lastName: string;
  firstName: string;
  email: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: Customer | null;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await authService.getCustomerProfile();
        if (response) {
          const transformedCustomer: Customer = {
            id: response.id,
            googleId: response.google_id,
            lastName: response.last_name,
            firstName: response.first_name,
            email: response.email,
          };
          setCustomer(transformedCustomer);
        }
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("access_token");
      setCustomer(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    window.location.href = "/api/auth/google";
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      setCustomer(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        customer,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context as AuthContextType;
};
