import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

export default function CriarUsuario() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("COMUM");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/users", {
        nome,
        email,
        senha,
        matricula,
        tipoUsuario,
      });

      alert("Usuário cadastrado!");

      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <Layout>
      <h1>Novo Usuário</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />

        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="COMUM">COMUM</option>
          <option value="ESPECIAL">ESPECIAL</option>
        </select>

        <button type="submit">Salvar</button>
      </form>
    </Layout>
  );
}
