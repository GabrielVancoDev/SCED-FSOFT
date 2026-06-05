import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Dashboard Administrador</h1>

      <p>Bem-vindo, {user?.email}</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
