import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import Breadcrumbs from '../../components/PageHeader/Breadcrumbs';

const Games = ({ history }) => (
    <div className="Games">
    
        <Row>
            <Col xs={12}>
                <Breadcrumbs title="Games" history={history} />
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                
                <div className="games-banner insurgency">
                    <h1>Insurgency</h1>
                </div>
    
                <div className="games-banner hockey">
                    <h1>Hockey?</h1>
                </div>
    
            </Col>
        </Row>
    
    </div>
);

Games.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Games;
