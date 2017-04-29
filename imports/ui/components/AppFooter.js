import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';
import FontAwesome from 'react-fontawesome';

const AppFooter = ({ hasUser }) => (
    <footer>
       <div className="container">
            <Row>
                <Col id="footer-branding" md={4} xs={12}>
                    <img src="/images/logo.svg" />
                    <p>
                        Copyright &copy; 2017 The Digital Gaming League.
                        <br />
                        All Rights Reserved.
                    </p>
                </Col> 

                <Col md={2} mdOffset={2}>
                    <header>Questions?</header>
                    <ul>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Staff</li>
                        <li>Ban List</li>
                    </ul>
                </Col>
    
                <Col md={2}>
                    <header>Social</header>
                    <ul>
                        <li>Twitch</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>YouTube</li>
                        <li>Steam Group</li>
                    </ul>
                </Col>

                <Col md={2}>
                    <header>Events</header>
                    <ul>
                        <li>NA Season 9</li>
                        <li>EU Season 9</li>
                        <li>AU/NZ Season 9</li>
                        <li>LHL Season 26</li>
                        <li>RSL Season 25</li>
                    </ul>
                </Col>
    
            </Row>

        </div>
    </footer>           
);

AppFooter.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppFooter);
