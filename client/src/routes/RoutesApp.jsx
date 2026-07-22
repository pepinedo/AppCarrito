import { useContext } from "react";
import { MainContext } from "../context/ContextProvider.jsx";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";
import { Login } from "../pages/Auth/Login.jsx";
import { Register } from "../pages/Auth/Register.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";

export const RoutesApp = () => {
  const { user, loading } = useContext(MainContext);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <header></header>

        <main className="page">
          <Routes>
            {user ? (
              /* --- RUTAS PRIVADAS (Usuario Logueado) --- */
              <>
                <Route path="/" element={<Home />} />
                {/* Opcional: si un logueado va a /login o /register, lo mandamos al Home */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
              </>
            ) : (
              /* --- RUTAS PÚBLICAS (Usuario NO Logueado) --- */
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* 1. Si va a "/" sin estar logueado -> Redirige a /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="" element={<Navigate to="/login" replace />} />
              </>
            )}

            {/* 2. Cualquier otra ruta no existente -> Muestra 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer>
          <p>© Todos los derechos reservados.</p>
        </footer>
      </BrowserRouter>
    </div>
  );
};