import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Footer = () => (
    <footer>
       <div className="container">
            <Row>
                <Col id="footer-branding" xs={12} md={3}>
                    <Link to="/"><img src="/images/logo.svg" /></Link>
                    <p>
                        Copyright &copy; 2017 The Digital Gaming League.
                        <br />
                        All Rights Reserved.
                    </p>
                </Col> 

                <Col md={2} mdOffset={1} xsHidden smHidden className="divide">
                    <header>Questions?</header>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/community/staff">Staff</Link></li>
                        <li>Ban List</li>
                    </ul>
                </Col>
    
                <Col md={2} xsHidden smHidden className="divide">
                    <header>Social</header>
                    <ul>
                        <li><a href="https://discord.gg/r7gt9RH">Discord</a></li>
                        <li><a href="https://www.twitch.tv/the_dgl">Twitch</a></li>
                        <li><a href="https://twitter.com/TheDGL_org">Twitter</a></li>
                        <li><a href="https://www.youtube.com/user/DigitalGamingLeague">YouTube</a></li>
                        <li>Steam Group</li>
                    </ul>
                </Col>

                <Col md={2} xsHidden smHidden className="divide">
                    <header>Events</header>
                    <ul>
                        <li>NA Season 9</li>
                        <li>EU Season 9</li>
                        <li>AU/NZ Season 9</li>
                        <li>LHL Season 26</li>
                    </ul>
                </Col>
    
            </Row>

        </div>
    </footer>           
);

export default Footer;
