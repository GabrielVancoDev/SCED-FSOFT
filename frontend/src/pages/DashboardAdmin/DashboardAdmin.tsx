import { useAuth } from "../../contexts/AuthContext";

export default function DashboardAdmin() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard Administrador</h1>
    </div>
  );
}
