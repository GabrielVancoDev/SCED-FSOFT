import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(""); // Estados para armazenar os dados do formulário
  const [senha, setSenha] = useState(""); // Estados para armazenar os dados do formulário

  const Navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      login(response.data.access_token, response.data.user);
      // console.log("Login realizado");
      if (response.data.user.tipoUsuario === "ADMIN") {
        Navigate("/admin");
      } else {
        Navigate("/usuario");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>SCED</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
