import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
    
        <section id="profile">
            <h4><a href="/login">Not logged in</a></h4>
            <div id="avatar">
                <FontAwesome name="user-circle-o" />
            </div>
        </section>
    
    </div>
);       

// Authenticated
const AuthenticatedSidebar = ({ name }) => ( 
    <div id="sidebar-private">
    
        <section id="sidebar-breadcrumbs"></section>
    
        <OverlayTrigger placement="right" overlay={constructionWarning}>
            <section id="profile-stats">
                <h4> Stats </h4> 
                <p> Wins</p>
                <p> Losses</p>
                <p> Games played</p>
                <p> Member since</p>
            </section>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={constructionWarning}>
            <section id="team-profile">
                <h4> Team name </h4> 
                <div id="team-emblem">
                    <FontAwesome name="users" />
                </div>
            </section>
        </OverlayTrigger>
    
        <section id="profile">
            <h4> { name } </h4> 
            <div id="avatar">
                <FontAwesome name="user-circle-o" />
            </div>
            <h5 onClick={() => Meteor.logout()}>
                Logout
            </h5>
        </section>

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
