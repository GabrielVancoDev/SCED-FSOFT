import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>SCED</h2>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/departamentos">Departamentos</Link>
          <Link to="/documentos">Documentos</Link>
        </nav>

        <button onClick={handleLogout}>Sair</button>
      </aside>

      <main className="content">
        <header className="topbar">
          <span>{user?.nome || user?.email}</span>
        </header>

        {children}
      </main>
    </div>
  );
}
