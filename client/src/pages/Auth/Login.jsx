import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [errorMsg, setErrorMsg] = useState("");
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useContext(MainContext);

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try
        {            
            setIsLoading(true);
    
            const res = fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginForm)
            });
            let token = res.token;
            let userData = res.user;
            login(userData, token);
            navigate("/");
        }
        catch(error)
        {
            if(error.response)
            {
                setErrorMsg("Pa tu casa.")
            }
        }
        finally
        {
            setIsLoading(false);
        }
    }

    console.log(loginForm);

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label 
                        htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={loginForm.email} 
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label 
                        htmlFor="password">
                        Contraseña
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={loginForm.password} 
                        onChange={handleChange} />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Login"}
                </button>
            </form>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <div>
                <p>
                    ¿No tienes una cuenta? 
                    <Link to="/register" className="register-button">Regístrate</Link>
                    {/* <span className="register-button" onClick={()=>navigate("/register")}>Regístrate</span> */}
                </p>
            </div>
        </div>
    );
};