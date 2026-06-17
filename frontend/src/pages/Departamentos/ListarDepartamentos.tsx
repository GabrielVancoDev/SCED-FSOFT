import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

interface Departamento {
  id: number;
  nome: string;
  sigla: string;
  descricao?: string;
  ativo: boolean;
}

export default function ListarDepartamentos() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  useEffect(() => {
    carregarDepartamentos();
  }, []);

  async function carregarDepartamentos() {
    try {
      const response = await api.get("/departamentos");
      setDepartamentos(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar departamentos");
    }
  }

  return (
    <Layout>
      <h1>Departamentos</h1>

      <Link to="/departamentos/novo">
        <button>Novo Departamento</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.nome}</td>
              <td>{departamento.sigla}</td>
              <td>{departamento.descricao || "-"}</td>
              <td>{departamento.ativo ? "Ativo" : "Inativo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
