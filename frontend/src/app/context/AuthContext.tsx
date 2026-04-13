import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "student" | "company";

interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
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

  const login = (email: string, password: string): boolean => {
    // Check student credentials
    if (
      email === DEMO_USERS.student.email &&
      password === DEMO_USERS.student.password
    ) {
      setUser({
        email: DEMO_USERS.student.email,
        name: DEMO_USERS.student.name,
        role: DEMO_USERS.student.role,
      });
      return true;
    }

    // Check company credentials
    if (
      email === DEMO_USERS.company.email &&
      password === DEMO_USERS.company.password
    ) {
      setUser({
        email: DEMO_USERS.company.email,
        name: DEMO_USERS.company.name,
        role: DEMO_USERS.company.role,
      });
      return true;
    }

    return false;
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
