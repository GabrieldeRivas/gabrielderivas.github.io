import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import '../css/header.css';

const Header = () => {
    return (
        <Fragment>
            <Navbar expand="md" variant="dark" fixed="top">
                <Container fluid className='container-90'>
                    <Navbar.Brand href="#">
                        <p className='logo'>Chroma<span className="logo-red">Mi</span><span className="logo-violet">x</span><span className='logo-blue'>er</span></p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link href="#ancla-random">Mixer</Nav.Link>
                        <Nav.Link href="#ancla-palette">Palette</Nav.Link>
                        <Nav.Link href="#ancla-about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>        
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Header;