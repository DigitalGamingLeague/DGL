import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
    <Nav>
    
        <LinkContainer to="login">
            <NavItem eventKey={4}>Login</NavItem>
        </LinkContainer>

    </Nav>
);

export default PublicNavigation;
