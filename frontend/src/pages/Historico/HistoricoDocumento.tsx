import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

interface Historico {
  id: number;
  statusAnterior: string | null;
  statusNovo: string;
  observacao?: string;
  createdAt: string;
  usuario?: {
    nome: string;
  };
}

export default function HistoricoDocumento() {
  const { id } = useParams();
  const [historicos, setHistoricos] = useState<Historico[]>([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    try {
      const response = await api.get(`/historico-documento/documento/${id}`);
      setHistoricos(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar histórico");
    }
  }

  return (
    <Layout>
      <h1>Histórico do Documento</h1>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Status Anterior</th>
            <th>Status Novo</th>
            <th>Observação</th>
            <th>Usuário</th>
          </tr>
        </thead>

        <tbody>
          {historicos.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.createdAt).toLocaleString("pt-BR")}</td>
              <td>{item.statusAnterior || "-"}</td>
              <td>{item.statusNovo}</td>
              <td>{item.observacao || "-"}</td>
              <td>{item.usuario?.nome || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
