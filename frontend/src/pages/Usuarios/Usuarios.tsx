import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";

// Banco de Dados
interface User {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  tipoUsuario: string;
  ativo: boolean;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  // O useEffect faz a chamada para carregar os usuários
  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const token = localStorage.getItem("token"); // Pegando o token

      // Chamada da API
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <h1>Usuários</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Matrícula</th>
            <th>Perfil</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.matricula}</td>
              <td>{usuario.tipoUsuario}</td>
              <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
