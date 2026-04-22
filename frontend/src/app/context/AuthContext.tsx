import { createContext, useContext, useState, ReactNode } from "react";
import { clearAuthSession, storeAuthSession, AUTH_SESSION_STORAGE_KEY } from "../lib/api";

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

interface AuthSession {
  user: User;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, selectedRole: UserRole) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    if (
      parsed.user &&
      typeof parsed.user.email === "string" &&
      typeof parsed.user.name === "string" &&
      (parsed.user.role === "student" || parsed.user.role === "company") &&
      typeof parsed.accessToken === "string"
    ) {
      return {
        email: parsed.user.email,
        name: parsed.user.name,
        role: parsed.user.role,
      };
    }
  } catch {
    // Ignore malformed storage payload and clear below.
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  return null;
}

export const DEMO_USERS = {
  student: {
    email: "student@gmail.com",
    password: "123456",
    role: "student" as const,
    name: "Alex Johnson",
  },
  company: {
    email: "admin@internfeedback.com",
    password: "123456",
    role: "company" as const,
    name: "Company Admin",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

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

      const data: { email: string; name: string; role: UserRole; access_token: string } = await response.json();
      if (data.role !== selectedRole) {
        return { user: null, error: "role_mismatch" };
      }

      const loggedInUser: User = {
        email: data.email,
        name: data.name,
        role: data.role,
      };
      setUser(loggedInUser);
      storeAuthSession({ user: loggedInUser, accessToken: data.access_token });
      return { user: loggedInUser };
    } catch {
      return { user: null, error: "invalid_credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    clearAuthSession();
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
