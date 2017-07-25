import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import StatusBar from '../../components/StatusBar/StatusBar';

const constructionWarning = (
    <Popover className="construction-warning" title="Under Construction">
        Sorry, this is disabled while the site is under construction. 
    </Popover>
);

const Sidebar = props  => (
    <div id="sidebar">
        {
            !props.authenticated ? <PublicSidebar/> : <AuthenticatedSidebar {...props} />
        }
    </div>
);         

// Public
const PublicSidebar = () => ( 
    <div id="sidebar-public">
    
        <section id="sidebar-breadcrumbs"></section>
    
        <section id="sidebar-user-avatar">
            <div id="avatar">
                <FontAwesome name="user-circle-o" />
            </div>
        </section>

        <StatusBar /> 

    
    </div>
);       

// Authenticated
const AuthenticatedSidebar = ({ name }) => ( 
    <div id="sidebar-private">
    
        <section id="sidebar-breadcrumbs"></section>
    
        <section id="sidebar-team-avatar">
            <FontAwesome name="users" />
        </section>
    
        <section id="sidebar-user-avatar">
            <a href="/profile">
                <FontAwesome name="user-circle-o" />
            </a>    
        </section>

        <section id="sidebar-logout">
            <h6> 
                <a href="/profile">{ name }</a> 
            </h6> 
            <h6 onClick={() => Meteor.logout()}>
               Logout
            </h6>
        </section>

        <StatusBar /> 

    </div>
);

Sidebar.defaultProps = {
    name: '',
};

Sidebar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string
};

export default Sidebar;
