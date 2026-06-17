import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Layout>
      <h1>Dashboard Usuário</h1>

      <p>Bem-vindo, {user?.nome}</p>

      <button onClick={handleLogout}>Sair</button>
    </Layout>
  );
}
