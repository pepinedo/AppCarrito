import { useContext } from "react";
import { MainContext } from "../../context/ContextProvider.jsx";

export const Home = () => {

    const { user } = useContext(MainContext);

    return (
        <div className="home-page">
            <h1>Inicio</h1>
            <p>Hola, {user.username}</p>
        </div>
    )
}