import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import FontAwesome from 'react-fontawesome';
import NewsList from '../../components/NewsList/NewsList';
                                     
const Index = props => (
    <div className="Index">
    
        <Col xs={12} md={8} id="home-updates">
    
            <div className="imagebox">
                <img src="/images/banner.jpg" />
                <div className="imagebox-shadow"></div>
            </div>
    
            <NewsList {...props} />
    
        </Col>
    
        <Col md={4} xsHidden smHidden id="grid-right">
    
            { !props.authenticated ? <GridboxLogin /> : <GridboxJoinTeam /> }
                                     
            <GridboxAbout />
                                     
            <GridboxContact />
    
        </Col>
  </div>
);           

                                     
const GridboxJoinTeam = () => ( 
                                     
    <div className="gridbox" id="gridbox-login">

        <h4>Would you like to participate in BCL matches?</h4>
    
        <Button bsSize="large" bsStyle="primary" block href="/teams">Join a team</Button>
        
        <h5>OR</h5>
    
        <Button bsSize="large" bsStyle="primary" block href="/teams/new">Create a team</Button>
    
    </div>
);
                                     
const GridboxLogin = () => ( 
                                     
    <div className="gridbox" id="gridbox-login">

        <h4>Please login to unlock features</h4>
    
        <Button bsSize="large" bsStyle="primary" block href="/login">Login</Button>
        
        <h5>OR</h5>
    
        <Button bsSize="large" bsStyle="primary" block href="/signup">Register</Button>
    
    </div>
);
                                     
const GridboxAbout = () => (
                                     
    <div className="gridbox" id="gridbox-about">
                                     
        <h6>The Community League</h6>
    
        <p>
            With the marked lack of tools made available by the developers, the community has a very real need of third-party organized matchmaking. Over the past four years, BCL has stepped up to the plate and spearheaded this role in order to provide a competitive, inter-clan tournament system.
        </p>

        <p>
            Blacklight Community League started out as a small, temporary solution for the PC competitive scene of Blacklight Retribution. Created by a team of dedicated hardcore Blacklight fans, it has since become the go-to website for Tournaments, Events, News and Feedback for PC and PS4. Over the years since its inception, BCL has held Tournaments and Events through the timeline of BLR. Many of the Tournaments have been watched by hundreds of fans live on Twitch and through the Youtube recordings provided by the competitors since 2013.
        </p>

        <p>
            Memories have been formed through the avid shoutcasting by Community favorites such as FWD, TheCallMeDomino, ZeroArmada, Derps, Chaingear and many more players. We have made it our mission to ensure BLR had an active competitive side to cater to those looking for more than just a pubstomp.
        </p>

        <p>
            The overall goal of BCL going forward is to reinvigorate the competitive scene that has grown stale over the last two years in hopes that it will give a reason for old players to rejoin, new players to sign up and light that flame in our hearts that has dulled with time.
        </p>
                                     
    </div>
);
                                     
const GridboxContact = () => ( 
                                     
    <div className="gridbox" id="gridbox-contact">
        
        <h4>Have questions? Contact us.</h4>
                                     
        <ListGroup>
                           
                                     
            <ListGroupItem>
                Discord server
                <span>
                    <img className='discord-icon' src='/images/Discord-Logo-White.svg' />
                </span>
            </ListGroupItem>
                                     
            <ListGroupItem>
                @playbcl 
                <FontAwesome name='twitter' />
            </ListGroupItem>
                                     
            <ListGroupItem>
                staff@playbcl.com 
                <FontAwesome name='envelope' />
            </ListGroupItem>  
        </ListGroup>
                                     
    </div>
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
