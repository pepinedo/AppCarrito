import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {

    const [registerForm, setRegisterForm] = useState({  
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const navigate = useNavigate(); 

    return (
        <div className="register-page">
            <h2>Register</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <div>
                <p>
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="register-button">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}