import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Popover, OverlayTrigger, Form, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const constructionWarning = (
    <Popover className="construction-warning" title="Under Construction">
        Sorry, this is disabled while the site is under construction. 
    </Popover>
);

const Navigation = props => ( 
    <Navbar id="navigation" fixedTop>
        <Navbar.Header>
            <Navbar.Brand className="hidden-sm">
                <LinkContainer to="/">
                    <img id="logo" src="/images/logo.svg" />
                </LinkContainer >
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <GlobalNavigation { ...props } />
            <MediaNavigation />
        </Navbar.Collapse>
    </Navbar>
);
                                     
const GlobalNavigation = props => (
    <Nav>

        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="/games">
                <NavItem eventKey={2}>
                    Games
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>
    
        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="/watch">
                <NavItem eventKey={3}>
                    Watch
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="/events">
                <NavItem eventKey={4}>
                    Events
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>
    
        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="/community">
                <NavItem eventKey={4}>
                    Community
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>
    
        {
            !props.authenticated ? (
    
                <LinkContainer to="/login">
                    <NavItem eventKey={5}>
                        Login
                    </NavItem>
                </LinkContainer>
            )
            : (
                <NavDropdown eventKey="5" title={props.name} id="nav-dropdown">
                
                    { 
                        Roles.userIsInRole( Meteor.userId(), ['admin']) ? (
                            <LinkContainer to="/admin">
                                <MenuItem eventKey="5.1">
                                    Admin
                                </MenuItem>
                            </LinkContainer> 
                        ) : ''
                    }
                
                    <LinkContainer to="/profile">
                        <MenuItem eventKey="5.2">
                            Profile
                        </MenuItem>
                    </LinkContainer>
        
                    <MenuItem divider />
                
                    <MenuItem onClick={() => Meteor.logout()} eventKey="5.3">
                        Logout
                    </MenuItem>
                
                </NavDropdown>
            )
        }
    </Nav>                                    
);


                                     
const MediaNavigation = () => (
    
    <div>
    
        <div className="pull-right visible-sm hidden-md">
            <Link to="/">
                <img id="logo-small" src="/images/logo.svg" />
            </Link >
        </div>
    
        <Nav pullRight id="media-nav" className="hidden-sm hidden-xs">

            <NavItem eventKey={7} href="https://www.twitch.tv/the_dgl">
                <FontAwesome name='twitch' />
            </NavItem>  

            <NavItem eventKey={8} href="https://twitter.com/TheDGL_org">
                <FontAwesome name='twitter' />
            </NavItem>

            <NavItem eventKey={9}>
                <FontAwesome name='sitemap' />
            </NavItem>

            <NavItem eventKey={10}>
                <Form componentClass="fieldset" inline>
                    <FormGroup bsSize="small">
                        <InputGroup>
                            <FormControl type="text" placeholder="Search..." />
                            <InputGroup.Addon>
                                <FontAwesome name='search' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </NavItem>

        </Nav>
    
    </div>
                                   
);

Navigation.defaultProps = {
    name: '',
};

Navigation.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string
};

export default Navigation;