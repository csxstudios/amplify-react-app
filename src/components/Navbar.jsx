import React from 'react';
import { Nav, NavItem, NavLink, Dropdown } from 'react-bootstrap';

const Navbar = ({ signOut, user }) => {
    return (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <Nav.Item>
                <span className="text-white">Amplify React Demo</span>
            </Nav.Item>
            <Nav className="navbar-nav ms-md-auto text-white" as="ul">
                <Dropdown as={NavItem}>
                    <Dropdown.Toggle as={NavLink}>Hello {user.username}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <button className="btn btn-link" onClick={signOut}>Sign out</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Nav>
    )
}

export default Navbar;