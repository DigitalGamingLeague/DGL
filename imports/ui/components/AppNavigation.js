import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, FormGroup, FormControl, InputGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from './PublicNavigation.js';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';
import container from '../../modules/container';
import FontAwesome from 'react-fontawesome';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            { renderNavigation(hasUser) }
            <MediaNavigation />
        </Navbar.Collapse>
    </Navbar>
);
                                     
const MediaNavigation = () => (

    <Nav pullRight>
    
        <NavItem eventKey={6}>
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
                                     
        <NavItem eventKey={7} href="https://twitter.com/TheDGL_org">
            <FontAwesome name='twitter' />
        </NavItem>
                                     
        <NavItem eventKey={8}>
            <FontAwesome name='sitemap' />
        </NavItem>

    </Nav>
                                   
);

AppNavigation.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppNavigation);
