import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminsLayout from "./layout/AdminsLayout";
import UsuariosLayout from "./layout/UsuariosLayout";
import SuperAdminsLayout from "./layout/SuperAdminsLayout";

import { AuthProvider } from "./context/AuthProvider";
import ProductosProvider from "./context/ProductosProvider";
import SociosProvider from "./context/SociosProvider";

import AdminInicio from "./pages/admin/AdminInicio";
import ListaSocios from "./pages/admin/ListaSocios";
import Login from "./pages/Login";
import Perfil from "./pages/socio/Perfil";
import SuperAdminInicio from "./pages/superAdmin/SuperAdminInicio";
import ScannerQR from "./pages/admin/ScannerQR";
import Buffet from "./pages/admin/Buffet";
import Ventas from "./pages/admin/Ventas";
import Estadisticas from "./pages/admin/Estadisticas";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SociosProvider>
          <ProductosProvider>
            <Routes>
              {/* UNICA RUTA PUBLICA */}
              <Route path="/" element={<Login />} />
              <Route path="*" element={<h1>NOT FOUND 404</h1>} />

              {/* RUTA PROTEGIDA DEL SOCIO */}
              <Route path="/perfil" element={<UsuariosLayout />}>
                <Route path=":id" element={<Perfil />} />
              </Route>

              {/* RUTAS PROTEGIDA DEL ADMIN */}
              <Route path="/admin" element={<AdminsLayout />}>
                <Route index element={<AdminInicio />} />
                <Route path="socios" element={<ListaSocios />} />
                <Route path="scanner-qr" element={<ScannerQR />} />
                <Route path="buffet" element={<Buffet />} />
                <Route path="ventas" element={<Ventas />} />
                <Route path="estadisticas" element={<Estadisticas />} />
                <Route path="*" element={<h1>NOT FOUND 404</h1>} />
              </Route>

              {/* Ruta al superAdmin */}
              <Route path="/superadmin" element={<SuperAdminsLayout />}>
                <Route index element={<SuperAdminInicio />} />
                <Route path="*" element={<h1>NOT FOUND 404</h1>} />
              </Route>
            </Routes>
          </ProductosProvider>
        </SociosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
