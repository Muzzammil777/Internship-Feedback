export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
export const AUTH_SESSION_STORAGE_KEY = "movicloud-auth-session";

export interface AuthSessionUser {
  email: string;
  name: string;
  role: "student" | "company";
}

export interface AuthSession {
  user: AuthSessionUser;
  accessToken: string;
}

function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawSession) as Partial<AuthSession>;
    if (
      parsed.user &&
      typeof parsed.accessToken === "string" &&
      typeof parsed.user.email === "string" &&
      typeof parsed.user.name === "string" &&
      (parsed.user.role === "student" || parsed.user.role === "company")
    ) {
      return {
        user: {
          email: parsed.user.email,
          name: parsed.user.name,
          role: parsed.user.role,
        },
        accessToken: parsed.accessToken,
      };
    }
  } catch {
    // Ignore malformed storage payload and clear below.
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  return null;
}

export function getStoredAuthToken(): string | null {
  return readStoredSession()?.accessToken ?? null;
}

export function storeAuthSession(session: AuthSession): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = getStoredAuthToken();

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
