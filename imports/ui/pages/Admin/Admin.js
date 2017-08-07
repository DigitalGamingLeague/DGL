import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import FontAwesome from 'react-fontawesome';
import NewsList from '../../components/NewsList/NewsList';
                                     
const Index = props => (
    <div className="Index">
        <Row>
            <Col xs={12}>

                <div className="imagebox" id="banner">
                    <img src="/images/genericpicture.jpg" />
                    <div className="imagebox-shadow"></div>
                </div>

            </Col>
        </Row>
    
        <Row>
    
            <Col xs={12} md={9} >
                <NewsList {...props} />
            </Col>    
        
            <Col md={3} xsHidden smHidden>

    
                    <MatchResult />
                    <MatchResult />
                    <MatchResult />
                    <MatchResult />
    
            </Col>
        </Row>
    
    </div>
);           

const MatchResult = () => (

    <Grid fluid>
        <Row className="match-result">
    
            <Col md={4} className="match-result-team">
                <div className="match-result-team-name">
                    Team1
                </div>
            </Col>
    
            <Col md={4} className="match-result-vs">
                vs
            </Col>
    
            <Col md={4} className="match-result-team">
                <div className="match-result-team-name">
                    Team2
                </div>
            </Col>
    
        </Row>
    
        <Row className="match-result-date">
            September 08, 2017
        </Row>
    </Grid>
);

Index.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string,
    roles: PropTypes.array.isRequired,
};

Index.defaultProps = {
    name: ''
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const loading = !Roles.subscription.ready();
    const name = user && user.profile && user.profile.name && getUserName(user.profile.name);

    return {
        authenticated: !loggingIn && !!userId,
        name: name,
        roles: !loading && Roles.getRolesForUser(userId),
    };
}, Index); 
