import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
    <Nav>
    
        <LinkContainer to="games">
            <NavItem className="divide" eventKey={1}>
                Games 
            </NavItem>
        </LinkContainer>

        <LinkContainer to="watch">
            <NavItem className="divide" eventKey={2}>
                Watch
            </NavItem>
        </LinkContainer>

        <LinkContainer to="events">
            <NavItem className="divide" eventKey={3}>
                Events
            </NavItem>
        </LinkContainer>
    
        <LinkContainer to="login">
            <NavItem eventKey={4}>Login</NavItem>
        </LinkContainer>

        <LinkContainer to="/">
            <img id="logo" src="/images/logo.svg" />
        </LinkContainer>

    </Nav>
);

export default PublicNavigation;
