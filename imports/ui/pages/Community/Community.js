import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import Breadcrumbs from '/imports/ui/components/PageHeader/Breadcrumbs';
import { Link } from 'react-router-dom';

const Games = ({ history }) => (
    <div className="Community">
    
        <Row>
            <Col xs={12}>
                <Breadcrumbs title="Games" history={history} />
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
    
            <Col xs={12} md={4} className="text-center">
                
                <h2>Members</h2>

                <p>
                    Blah blah blah.
                </p>
    
            </Col>
    
            <Col xs={12} md={4} className="text-center">
                
                <h2>Teams</h2>

                <p>
                    Blah blah blah.
                </p>
    
            </Col>
    
            <Col xs={12} md={4} className="text-center">
                
                <h2>Staff</h2>

                <p>
                    Blah blah blah.
                </p>
    
            </Col>
    
        </Row>
    
    </div>
);

Games.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Games;
