import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col, ListGroup, ListGroupItem, Well } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import TeamsCollection from '/imports/api/Teams/Teams';
import Loading from '/imports/ui/components/Loading/Loading';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import NotFound from '/imports/ui/pages/Misc/NotFound';

const handleDelete = (teamId, history) => {
  if (confirm('Are you sure you want to delete the team? This is permanent!')) {
    Meteor.call('teams.remove', teamId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Team deleted!', 'success');
        history.push('/teams');
      }
    });
  }
}; 

const handleJoin = (teamId, history) => {
    if (confirm('Are you sure you wish to join this team?')) {
        Meteor.call('teams.join', teamId, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Joined team!', 'success');
            }
        });
    }
}; 

const handleLeave = (teamId, history) => {
    if (confirm('Are you sure you wish to leave this team?')) {
        Meteor.call('teams.leave', teamId, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Successfully left team.', 'success');
            }
        });
    }
}; 

/* Find the current team for the user */
const currentTeam = () => {
    return TeamsCollection.findOne({
        members: { 
            $in: [Meteor.userId()] 
        } 
    })
}

const ViewTeam = ({ loading, team, match, history, currentTeam }) => (!loading ?  (
    team && team.length ? (
        
        <div className="teams-view">

            <PageHeader history={history} title={ team && team.name } />

            <Row>
                <Col xs={12}>

                    { Roles.userIsInRole( Meteor.userId(), ['admin']) ? <ViewTeamTools history={history} match={match} /> : '' }

                </Col>
            </Row>        

            <Row>

                <Col xs={12} sm={6} md={4}>            

                        {/* Roster */}             
                        <h4 className="text-muted">Roster</h4>                       
                        <ListGroup fill>
                                { 
                                    team && team.members && team.members.length ? team.members.map((id) => (
                                        <Link key={`roster${id}`} to={`/profile/${id}`}>
                                            <ListGroupItem key={id} className="text-info">
                                                { 
                                                    Meteor.users.findOne(id).profile.username 
                                                }
                                            </ListGroupItem>
                                        </Link>
                                    )) : 'No team members yet'    
                                }
                        </ListGroup>

                        <ListGroup fill>                       
                        {/* Join team */}
                        { 
                            !currentTeam ?   
                                <ListGroupItem className="text-center">
                                    <h4>You haven't yet joined a team, would you like to join this one?</h4>
                                    <Button bsStyle="info" bsSize="lg" className="button-section" onClick={() => handleJoin(team._id, history)}>Join {team.name}</Button>
                                </ListGroupItem>
                                : ''                   
                        }

                        {/* Leave team */} 
                        {  
                            (currentTeam && currentTeam._id === team._id) ?                    
                                <ListGroupItem className="text-center">
                                    <h4>You are currently a member of this team.</h4>
                                    <Button bsStyle="info" bsSize="lg" className="button-section" onClick={() => handleLeave(team._id, history)}>Leave {team.name}</Button>
                                </ListGroupItem>
                                : ''                 
                        }
                        </ListGroup>

                </Col>

                <Col xs={12} sm={6} md={4}>

                    {/* Team info */}
                    <h4 className="text-muted">Team Information</h4>
                    <ListGroup fill>
                        <ListGroupItem key={1} header="Abbreviation" className="text-primary" >{team && team.abbreviation}</ListGroupItem>
                        <ListGroupItem key={2} header="Wins" className="text-primary" >No data available</ListGroupItem>
                        <ListGroupItem key={3} header="Losses" className="text-primary" >No data available</ListGroupItem>
                        <ListGroupItem key={4} header="Games Played" className="text-primary" >No data available</ListGroupItem>
                        <ListGroupItem key={5} header="Last Tournament" className="text-primary" >No data available</ListGroupItem>
                        <ListGroupItem key={6} header="Website" className="text-primary" >{team && team.website}</ListGroupItem>
                        <ListGroupItem key={7} header="Created" className="text-primary" >{team && moment(team.createdAt).calendar()}</ListGroupItem>
                    </ListGroup>

                </Col>

                <Col xsHidden smHidden md={4}>

                    {/* Emblem */} 
                    <div id="teams-view-emblem">
                        <FontAwesome name="users" />                                  
                    </div>

                    {/* Team description */}       
                    { 
                        team && team.description ?  
                            <blockquote className="blockquote">
                                { team.description }
                            </blockquote>
                        : ''
                    }
                </Col>
            </Row>

        </div>

    ) : (<NotFound />)
) : <Loading />);
                                                                                  
const ViewTeamTools = ({ match, history}) => (
    <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small" className="button-section">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit team</Button>
            <Button onClick={() => handleDelete(team._id, history)} bsStyle="danger">
                Delete team
            </Button>
        </ButtonGroup>
    </ButtonToolbar>
);

ViewTeam.propTypes = {
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    currentTeam: PropTypes.object
};

export default createContainer(({ match }) => {
    const teamId = match.params._id;
    const subscription = Meteor.subscribe('teams.view', teamId);
    return {
        loading: !subscription.ready(),
        team: TeamsCollection.findOne(teamId) || {},
        currentTeam: currentTeam(),
    };
}, ViewTeam);
