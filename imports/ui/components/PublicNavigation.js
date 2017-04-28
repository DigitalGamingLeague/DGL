import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
    <Nav>
    
        <LinkContainer to="games">
            <NavItem eventKey={1}>
                Games 
            </NavItem>
        </LinkContainer>

        <LinkContainer to="watch">
            <NavItem eventKey={2}>
                Watch
            </NavItem>
        </LinkContainer>

        <LinkContainer to="forum">
            <NavItem eventKey={3}>
                Forum
            </NavItem>
        </LinkContainer>

        <LinkContainer to="/">
            <img id="logo" src="/images/logo.svg" />
        </LinkContainer>
    
        <LinkContainer to="login">
            <NavItem eventKey={4}>Login</NavItem>
        </LinkContainer>

    </Nav>
);

export default PublicNavigation;
