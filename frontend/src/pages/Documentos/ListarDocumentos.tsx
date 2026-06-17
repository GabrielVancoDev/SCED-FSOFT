import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../contexts/AuthContext";

interface Documento {
  id: number;
  numeroProtocolo: string;
  assunto: string;
  descricao?: string;
  usuario?: { nome: string };
  departamento?: { nome: string };
  status?: { nome: string };
}

interface StatusDocumento {
  id: number;
  nome: string;
}

export default function ListarDocumentos() {
  const { user } = useAuth();

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [status, setStatus] = useState<StatusDocumento[]>([]);

  useEffect(() => {
    carregarDocumentos();
    carregarStatus();
  }, []);

  async function carregarDocumentos() {
    try {
      const response = await api.get("/documentos");
      setDocumentos(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar documentos");
    }
  }

  async function carregarStatus() {
    try {
      const response = await api.get("/status-documento");
      setStatus(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar status");
    }
  }

  async function alterarStatus(documentoId: number, statusId: string) {
    if (!user) {
      alert("Usuário não encontrado");
      return;
    }

    try {
      await api.patch(`/documentos/${documentoId}/status`, {
        statusId: Number(statusId),
        usuarioId: user.id,
        observacao: "Status alterado pela interface React",
      });

      alert("Status atualizado!");
      carregarDocumentos();
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar status");
    }
  }

  return (
    <Layout>
      <h1>Documentos</h1>

      <Link to="/documentos/novo">
        <button>Novo Documento</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Protocolo</th>
            <th>Assunto</th>
            <th>Departamento</th>
            <th>Usuário</th>
            <th>Status Atual</th>
            <th>Alterar Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {documentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.numeroProtocolo}</td>
              <td>{documento.assunto}</td>
              <td>{documento.departamento?.nome}</td>
              <td>{documento.usuario?.nome}</td>
              <td>{documento.status?.nome}</td>

              <td>
                <select
                  defaultValue=""
                  onChange={(e) => alterarStatus(documento.id, e.target.value)}
                >
                  <option value="">Selecione</option>

                  {status.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <Link to={`/documentos/${documento.id}/historico`}>
                  <button>Histórico</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
