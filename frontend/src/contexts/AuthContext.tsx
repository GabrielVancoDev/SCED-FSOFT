import { createContext, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
  tipoUsuario: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function login(token: string, user: User) {
    console.log("TOKEN:", token);
    console.log("USER:", user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("TOKEN SALVO:", localStorage.getItem("token"));
    console.log("USER SALVO:", localStorage.getItem("user"));

    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
