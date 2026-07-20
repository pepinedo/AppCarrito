import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]:value})
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
                <button type="submit">Login</button>
            </form>
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