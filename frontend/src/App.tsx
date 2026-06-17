import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Usuarios from "./pages/Usuarios/Usuarios";
import CriarUsuario from "./pages/Usuarios/CriarUsuario";
import ListarDepartamentos from "./pages/Departamentos/ListarDepartamentos";
import CriarDepartamento from "./pages/Departamentos/CriarDepartamento";
import ListarDocumentos from "./pages/Documentos/ListarDocumentos";
import CriarDocumento from "./pages/Documentos/CriarDocumento";
import HistoricoDocumento from "./pages/Historico/HistoricoDocumento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuario"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios/novo"
          element={
            <PrivateRoute>
              <CriarUsuario />
            </PrivateRoute>
          }
        />

        <Route
          path="/departamentos"
          element={
            <PrivateRoute>
              <ListarDepartamentos />
            </PrivateRoute>
          }
        />

        <Route
          path="/departamentos/novo"
          element={
            <PrivateRoute>
              <CriarDepartamento />
            </PrivateRoute>
          }
        />

        <Route
          path="/documentos/novo"
          element={
            <PrivateRoute>
              <CriarDocumento />
            </PrivateRoute>
          }
        />

        <Route
          path="/documentos/:id/historico"
          element={
            <PrivateRoute>
              <HistoricoDocumento />
            </PrivateRoute>
          }
        />

        <Route
          path="/documentos"
          element={
            <PrivateRoute>
              <ListarDocumentos />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
