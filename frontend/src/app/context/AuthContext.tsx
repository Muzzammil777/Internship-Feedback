import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "student" | "company";

type LoginError = "invalid_credentials" | "role_mismatch";

interface LoginResult {
  user: User | null;
  error?: LoginError;
}

interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, selectedRole: UserRole) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_USERS = {
  student: {
    email: "student@example.com",
    password: "123456",
    role: "student" as const,
    name: "Alex Johnson",
  },
  company: {
    email: "admin@example.com",
    password: "123456",
    role: "company" as const,
    name: "Company Admin",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
    selectedRole: UserRole
  ): Promise<LoginResult> => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return { user: null, error: "invalid_credentials" };
      }

      const data: { email: string; name: string; role: UserRole } = await response.json();
      if (data.role !== selectedRole) {
        return { user: null, error: "role_mismatch" };
      }

      const loggedInUser: User = {
        email: data.email,
        name: data.name,
        role: data.role,
      };
      setUser(loggedInUser);
      return { user: loggedInUser };
    } catch {
      return { user: null, error: "invalid_credentials" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
