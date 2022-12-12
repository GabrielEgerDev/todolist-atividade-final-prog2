import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

export const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email && password) {
            const isLogged = await auth.signin(email, password);
            if(isLogged) {
                navigate("/tarefas");
            } else {
                alert("Login não realizado.");
            }
        }
    }

    return (
        <><br /><br /><div className="container loginPage">
            <h1>Login Page</h1>
            <br /><br />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control className="campoLogin" type="text" placeholder="Coloque seu usuário" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control className="campoLogin" type="password" placeholder="Coloque sua senha" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                    Entrar
                </Button>
            </Form>

            <br/>
            <h5>Observação</h5>
            <span>Para a visualização das tarefas é necessária uma autenticação. A autenticação não está sendo requisitada para um db, pois foi utilizado um return falso. Preencha os campos com qualquer valor e se autentique.</span>

            {/* <input type="text"  />
            <input type="password"  />
            <button >Logar</button> */}
        </div></>
    )
}