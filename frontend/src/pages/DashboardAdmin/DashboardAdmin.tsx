import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Layout>
      <h1>Dashboard Administrador</h1>

      <p>Bem-vindo, {user?.nome}</p>

      <button onClick={handleLogout}>Sair</button>
    </Layout>
  );
}
