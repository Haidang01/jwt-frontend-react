import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import logo from '../../../src/logo.svg';
import { logoutUser } from '../../services/userService'
import { toast } from 'react-toastify';
const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const history = useHistory()
    const location = useLocation();
    const handleLogout = async () => {
        let res = await logoutUser();
        if (res && res.EC === 0) {
            logoutContext()
            history.push('/login')
            toast.success('Logout success');
        } else {
            toast.error(res.EM)
        }
    }

    // console.log('>> user', user.account.username);
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="/" className='display-flex'>
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                // alt="React Bootstrap logo"
                                />
                                <span className='brand-name'>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link' exact>Home</NavLink>
                                    <NavLink to="/project" className='nav-link' >Project</NavLink>
                                    <NavLink to="/roles" className='nav-link' >Roles</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.account.username ?
                                        <>
                                            <Nav.Item className='nav-link brand-name haha'>
                                                Welcome {user.account.username}!
                                            </Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}>
                                                        Log out
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <NavLink to="/login" className='nav-link'>Login</NavLink>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {/* <div className="topnav">
                        <NavLink to="/project" exact>Project</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/users">Users</NavLink>
                    </div> */}
                </div>
            </>
        );
    } else {
        return <></>
    }
}

export default NavHeader;