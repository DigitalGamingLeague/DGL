import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import Breadcrumbs from '/imports/ui/components/PageHeader/Breadcrumbs';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Games = ({ history }) => (
    <div className="Community">
    
        <Row>
            <Col xs={12}>
                <Breadcrumbs title="Community" history={history} />
            </Col>
        </Row>
    
        <Row>
            <Col xs={12} className="text-center">
                <h1>Our Community</h1>
    
                <p>
                    Stuff about our community.
                </p>
    
            </Col>
        </Row>
    
        <hr />
    
        <Row>
    
            <Col xs={12} md={4}>
    
                <div className="text-center community-box community-box-members">
                
                    <h2>Members</h2>

                    <p>
                        Blah blah blah.
                    </p>

                    <div>
                        <Link to="/community/members">
                            <div className="circle-button">
                                <FontAwesome name="user"/>
                            </div>
                            <h6>View members</h6>
                        </Link>
                    </div>

                </div>
    
            </Col>
    
            <Col xs={12} md={4}>
                
                <div className="text-center community-box community-box-teams">
                
                    <h2>Teams</h2>

                    <p>
                        Blah blah blah.
                    </p>

                    <div>
                        <Link to="/community/teams">
                            <div className="circle-button">
                                <FontAwesome name="users"/>
                            </div>
                            <h6>View teams</h6>
                        </Link>
                    </div>
    
                </div>
    
            </Col>
    
            <Col xs={12} md={4}>
                
                <div className="text-center community-box community-box-staff">
                
                    <h2>Staff</h2>

                    <p>
                        Blah blah blah.
                    </p>
    
                    <div>
                        <Link to="/community/staff">
                            <div className="circle-button">
                                <FontAwesome name="id-badge"/>
                            </div>
                            <h6>See our staff</h6>
                        </Link>
                    </div>
    
                </div>
    
            </Col>
    
        </Row>
    
        <hr />
    
    </div>
);

Games.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Games;
