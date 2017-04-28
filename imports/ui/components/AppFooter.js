import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, FormGroup, FormControl, InputGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';
import FontAwesome from 'react-fontawesome';

const AppFooter = ({ hasUser }) => (
    <footer>
       <div class="container">

            <div className="row">
                <div id="footer-branding" className="col-md-4">
                    <img src="/images/logo.svg" />
                    <p>
                        Copyright &copy; 2017 The Digital Gaming League.
                        <br />
                        All Rights Reserved.
                    </p>
                </div> 

                <div className="col-md-2">
                    <header>Questions?</header>
                    <ul>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Staff</li>
                        <li>Ban List</li>
                    </ul>
                </div>
    
                <div className="col-md-2">
                    <header>Social</header>
                    <ul>
                        <li>Twitch</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>YouTube</li>
                        <li>Steam Group</li>
                    </ul>
                </div>

                <div className="col-md-2">
                    <header>Events</header>
                    <ul>
                        <li>NA Season 9</li>
                        <li>EU Season 9</li>
                        <li>AU/NZ Season 9</li>
                        <li>LHL Season 26</li>
                        <li>RSL Season 25</li>
                    </ul>
                </div>

                <div className="col-md-2">
                    <header>Partners</header>
                    <ul>
                        <li>Oorah Gaming</li>
                    </ul>
                </div>
    
            </div>

        </div>
    </footer>           
);

AppFooter.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppFooter);
