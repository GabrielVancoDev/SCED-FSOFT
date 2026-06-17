import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

export default function CriarDepartamento() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/departamentos", {
        nome,
        sigla,
        descricao,
      });

      alert("Departamento cadastrado!");
      navigate("/departamentos");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar departamento");
    }
  }

  return (
    <Layout>
      <h1>Novo Departamento</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Sigla"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
        />

        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </Layout>
  );
}
