import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

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

    // Validação na Interface
    if (email === "" || senha === "") {
      alert("Preencha todos os campos");
      return;
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">SCED</div>
          <h1>Bem-vindo</h1>
          <p>Sistema de Controle de Entrada de Documentos</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar no sistema</button>
        </form>
      </div>
    </div>
  );
}
