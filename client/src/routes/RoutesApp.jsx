import { useContext } from "react";
import { MainContext } from "../context/ContextProvider.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";
import { Login } from "../pages/Auth/Login.jsx";
import { Register } from "../pages/Auth/Register.jsx";

export const RoutesApp =()=>{

    let { user } = useContext(MainContext);

    return(
        <div className="app-container">
            <BrowserRouter>

            <header>
                 
            </header>

            <main className="page">
                <Routes>
                    {!user && (
                    <>
                        <Route path="/login" element={ <Login />} />
                        <Route path="/register" element={ <Register />} />
                    </>
                    )}

                    {user && (
                        <Route path="/" element={ <Home />} />

                    )}


                </Routes>
            </main>

            <footer>
                <p>© Todos los derechos reservados.</p>
            </footer>

            </BrowserRouter >
        </div>
    )
}