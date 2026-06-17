import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

interface Anexo {
  id: number;
  nomeArquivo: string;
  caminhoArquivo: string;
  documentoId: number;
}

export default function AnexosDocumento() {
  const { id } = useParams();

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [anexos, setAnexos] = useState<Anexo[]>([]);

  useEffect(() => {
    carregarAnexos();
  }, []);

  async function carregarAnexos() {
    try {
      const response = await api.get("/anexos");
      const anexosDoDocumento = response.data.filter(
        (anexo: Anexo) => anexo.documentoId === Number(id),
      );

      setAnexos(anexosDoDocumento);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar anexos");
    }
  }

  async function enviarAnexo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!arquivo) {
      alert("Selecione um arquivo");
      return;
    }

    const formData = new FormData();
    formData.append("documentoId", String(id));
    formData.append("arquivo", arquivo);

    try {
      await api.post("/anexos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Anexo enviado!");
      setArquivo(null);
      carregarAnexos();
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar anexo");
    }
  }

  return (
    <Layout>
      <h1>Anexos do Documento</h1>

      <form onSubmit={enviarAnexo}>
        <input
          type="file"
          onChange={(e) => setArquivo(e.target.files?.[0] || null)}
        />

        <button type="submit">Enviar Anexo</button>
      </form>

      <h2>Arquivos anexados</h2>

      <table>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {anexos.map((anexo) => (
            <tr key={anexo.id}>
              <td>{anexo.nomeArquivo}</td>
              <td>
                <a
                  href={`http://localhost:3000/anexos/download/${anexo.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Baixar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
