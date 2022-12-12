import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './index.css';

import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useContext } from 'react';

const Header: React.FC = () => {

    const auth = useContext(AuthContext);

    async function handleLogout() {
        await auth.signout();
        window.location.href = window.location.href;
    }

    return(
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">To-Do-List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item as={Link} className="nav-link" to="/tarefas">Tarefas</Nav.Item>
                    </Nav>
                    {auth.user && <button onClick={handleLogout}>LOGOUT</button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header