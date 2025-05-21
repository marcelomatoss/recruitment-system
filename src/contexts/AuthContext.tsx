
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

// Types
interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create API instance with base URL
const api = axios.create({
  baseURL: "/api",
});

// Configure API to use JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data from API or localStorage when the app loads
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const response = await api.get("/auth/user");
          setUser(response.data.user);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
        }
      }
      
      setLoading(false);
    };

    verifyUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post("/auth/login", { email, password });
      
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Falha na autenticação. Por favor, verifique suas credenciais.");
    }
  };

  // Register function
  const register = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post("/auth/register", { email, password });
      
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Falha no registro. Por favor, tente novamente.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
