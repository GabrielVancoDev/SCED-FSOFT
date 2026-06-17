import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

interface Usuario {
  id: number;
  nome: string;
}

interface Departamento {
  id: number;
  nome: string;
}

interface StatusDocumento {
  id: number;
  nome: string;
}

export default function CriarDocumento() {
  const navigate = useNavigate();

  const [numeroProtocolo, setNumeroProtocolo] = useState("");
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");

  const [usuarioId, setUsuarioId] = useState("");
  const [departamentoId, setDepartamentoId] = useState("");
  const [statusId, setStatusId] = useState("");

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [status, setStatus] = useState<StatusDocumento[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [usuariosRes, departamentosRes, statusRes] = await Promise.all([
        api.get("/users"),
        api.get("/departamentos"),
        api.get("/status-documento"),
      ]);

      setUsuarios(usuariosRes.data);
      setDepartamentos(departamentosRes.data);
      setStatus(statusRes.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dados do formulário");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/documentos", {
        numeroProtocolo,
        assunto,
        descricao,
        usuarioId: Number(usuarioId),
        departamentoId: Number(departamentoId),
        statusId: Number(statusId),
      });

      alert("Documento cadastrado!");
      navigate("/documentos");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar documento");
    }
  }

  return (
    <Layout>
      <h1>Novo Documento</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Número do Protocolo"
          value={numeroProtocolo}
          onChange={(e) => setNumeroProtocolo(e.target.value)}
        />

        <input
          placeholder="Assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        >
          <option value="">Selecione o usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>

        <select
          value={departamentoId}
          onChange={(e) => setDepartamentoId(e.target.value)}
        >
          <option value="">Selecione o departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nome}
            </option>
          ))}
        </select>

        <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
          <option value="">Selecione o status</option>
          {status.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </Layout>
  );
}
