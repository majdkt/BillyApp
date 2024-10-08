import React, { useState } from 'react';
import { login } from '../services/authService';
import '../css/login.css';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            onLoginSuccess(); // Callback to notify parent component of successful login
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h1>Hello!</h1>
            <h2>Hello!</h2>
            <h3>Hello!</h3>
            <h4>Hello!</h4>
            <h5>Hello!</h5>
            <h6>Hello!</h6>
            <h2>logIn</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
