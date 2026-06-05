import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>

        <li>
          <Link to="/usuarios">Usuários</Link>
        </li>

        <li>
          <Link to="/documentos">Documentos</Link>
        </li>

        <li>
          <Link to="/historico">Histórico</Link>
        </li>
      </ul>
    </aside>
  );
}
