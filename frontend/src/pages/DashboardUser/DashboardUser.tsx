import { createContext, useContext, useState } from "react";

// A Interface é responsável por definir os tipos de dados que serão usados na aplicação
interface User {
  id: number;
  email: string;
  tipoUsuario: string;
}

//
interface AuthContextData {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Cria o provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // Exportando o contexto
  const [token, setToken] = useState<string | null>(null);

  function login(token: string, user: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

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

export default function DashboardUser() {
  return (
    <div>
      <h1>Dashboard Usuário</h1>
    </div>
  );
}
