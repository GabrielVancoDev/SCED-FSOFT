import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardUser() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Dashboard Usuário</h1>

      <p>Bem-vindo, {user?.email}</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
