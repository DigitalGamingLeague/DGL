/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import FontAwesome from 'react-fontawesome';
import Loading from '../../components/Loading/Loading';
import { Roles } from 'meteor/alanning:roles';

const Profile = ({ loading }) => (!loading ? (
    <Row>
        <Col xs={12} md={5}>
            <h2>Profile</h2>
            <ListGroup>
    
                <ListGroupItem header="Username">
                    { Meteor.user().profile.username }
                </ListGroupItem>

                {  
                    Meteor.user().emails.map(({ address, verified }, i) => (

                        <ListGroupItem key={i} header={(i == 0)? 'E-mail' : ''} >
                            {address} 
                        </ListGroupItem>
                    ))
                }

                <ListGroupItem header="Registered">
                    { moment(Meteor.user().createdAt).calendar() }
                </ListGroupItem>

{console.log(Roles.getRolesForUser(Meteor.userId()))}

            </ListGroup>

            <ListGroup>
    
                <ListGroupItem header="In-game name">
                    { Meteor.user().profile.ign }
                </ListGroupItem>

            </ListGroup>
        </Col>
        <Col xsHidden smHidden mdOffset={1} md={5}>
            <h2>Stuff</h2>
        </Col>
    </Row>
) : <Loading />);

Profile.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('users.viewSelf');
    return {
        loading: !subscription.ready()
    };
}, Profile);