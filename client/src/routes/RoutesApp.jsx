import { useContext } from "react";
import { MainContext } from "../context/ContextProvider.jsx";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";

export const RoutesApp =()=>{

    // let { user } = useContext(MainContext);

    return(
        <div className="app-container">
            <header>
                 
            </header>

            <main>
                <Routes>
                    <Route path="/" element={ <Home />} />
                </Routes>
            </main>

            <footer>
                <p>© Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}