import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser/DashboardUser";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuario"
          element={
            <PrivateRoute>
              <DashboardUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
