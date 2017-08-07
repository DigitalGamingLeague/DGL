/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem, Button, Badge } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import FontAwesome from 'react-fontawesome';
import Loading from '/imports/ui/components/Loading/Loading';
import { Roles } from 'meteor/alanning:roles';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';

const getUserStatus = p => {      
    if (p && p.status.online)
    {
        if (p.status.idle) return (<span className="label label-warning">Idle</span>);
        else return (<span className="label label-success">Online</span>);
    }
    else return (<span className="label label-default">Offline</span>);
}

const Profile = ({ loading, profile, history }) => (!loading ? (
    <div className="profile">
        <PageHeader history={history} title={profile.profile.username}  />
    
        <Row className="button-section">
            <Col xs={12} md={6}>
                { 
                    profile._id === Meteor.userId() ? 
                        <Button bsStyle="primary" onClick={() => history.push('/profile/edit')}>Edit Profile</Button>
                        : '' 
                }  
            </Col>
        </Row>
                                                    
        <Row>
            <Col xs={12} md={6}>
                <ListGroup>

                    <ListGroupItem header="Status">
                        User is currently { getUserStatus(profile) }
                    </ListGroupItem>

                    {  
                        profile.emails && profile.emails.map(({ address, verified }, i) => (

                            <ListGroupItem key={i} header={(i == 0)? 'E-mail' : ''} >
                                {address} 
                            </ListGroupItem>
                        ))
                    }

                    <ListGroupItem header="Registered">
                        { moment(profile.createdAt).calendar() }
                    </ListGroupItem>

                    <ListGroupItem header='Roles' >
                        {  
                            Roles.getRolesForUser(profile._id).map(( title, i ) => (
                                    <Badge key={`role${i}`}>{title}</Badge>
                            ))
                        }
                    </ListGroupItem>

                </ListGroup>

                <ListGroup>

                    <ListGroupItem header="Description">
                        { profile.profile.description || 'Not specified'  }
                    </ListGroupItem>

                </ListGroup>

                <ListGroup>

                    <ListGroupItem header="In-game name">
                        { profile.profile.ign || 'Not specified'  }
                    </ListGroupItem>

                    <ListGroupItem header="Twitch Channel">
                        { profile.profile.twitch || 'Not specified'  }
                    </ListGroupItem>

                    <ListGroupItem header="YouTube Channel">
                        { profile.profile.youtube || 'Not specified' }
                    </ListGroupItem>

                    <ListGroupItem header="Steam Profile">
                        { profile.profile.steam || 'Not specified'  }
                    </ListGroupItem>

                    <ListGroupItem header="Website">
                        { profile.profile.website || 'Not specified'  }
                    </ListGroupItem>

                </ListGroup>
            </Col>
        </Row>
    </div>
) : <Loading />);

Profile.propTypes = {
    loading: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
    const profileId = match.params._id;
    const subscription = profileId ? Meteor.subscribe('users.view', profileId) 
            : Meteor.subscribe('users.viewSelf');
    return {
        loading: !subscription.ready(),
        profile: profileId ? Meteor.users.findOne(profileId): Meteor.user(),
    };
}, Profile);