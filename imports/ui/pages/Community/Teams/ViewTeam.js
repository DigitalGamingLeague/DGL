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
                      
class ViewTeam extends React.Component 
{
    
    constructor(props) 
    {
        super(props);
    }
    
    
    handleDelete(teamId, history) 
    {
    
        if (confirm('Are you sure you want to delete the team? This is permanent!'))
        {

            Meteor.call('teams.remove', teamId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('Team deleted!', 'success');
                    history.push('/teams');
                }

            });
        }
    }; 

    handleApply(teamId, history)
    {

        if (confirm('Are you sure you wish to apply to this team?'))
        {

            Meteor.call('teams.apply', teamId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('Application sent!', 'success');
                }

            });
        }
    }; 
    
    handleApplyCancel(teamId, history)
    {

        if (confirm('Are you sure you wish to cancel your application?'))
        {

            Meteor.call('teams.cancelApplication', teamId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('Application cancelled!', 'success');
                }

            });
        }
    }; 

    handleAcceptApplication(teamId, applicantId, history)
    {

        if (confirm('Allow user to join this team?'))
        {

            Meteor.call('teams.acceptApplication', teamId, applicantId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('User has joined the team!', 'success');
                }

            });
        }
    }; 

    handleDenyApplication(teamId, applicantId, history) 
    {

        if (confirm('Deny the application?'))
        {

            Meteor.call('teams.rejectApplication', teamId, applicantId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('User has been denied.', 'success');
                }

            });
        }
    }; 

    handleRemoveUserFromTeam(teamId, applicantId, history) 
    {

        if (confirm('Remove user from team?'))
        {

            Meteor.call('teams.removeUser', teamId, applicantId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('User has been removed from team.', 'success');
                }

            });
        }
    };     

    handleLeave(teamId, history) 
    {

        if (confirm('Are you sure you wish to leave this team?')) 
        {
            Meteor.call('teams.leave', teamId, (error) => {

                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('Successfully left team.', 'success');
                }

            });
        }
    }; 
                                                                                  
    ViewTeamTools( match, history)
    {
        return (
            <ButtonToolbar className="pull-right">
                <ButtonGroup bsSize="small" className="button-section">
                    <Button onClick={() => history.push(`${match.url}/edit`)}>Edit team</Button>
                    <Button onClick={() => this.handleDelete(team._id, history)} bsStyle="danger">
                        Delete team
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
    
    getUserTeamStatus(authenticated, currentTeam, team, history)
    {
        if (this.props.authenticated)
        {
            if (!this.props.currentTeam) 
            {
                if (this.props.applicant)
                {
                    return (
                        <ListGroupItem className="text-center">
                            <h4>You've applied to this team, but it must be accepted by the team owner</h4>
                            <Button bsStyle="info" bsSize="lg" className="button-section" onClick={() =>    this.handleApplyCancel(this.props.team._id, this.props.history)}>
                                Cancel application for {this.props.team.name}
                            </Button>
                        </ListGroupItem>
                    );
                }
                
                else
                {
                    return (
                        <ListGroupItem className="text-center"> 
                            <h4>You haven't yet joined a team, would you like to join this one?</h4>
                            <Button bsStyle="info" bsSize="lg" className="button-section" onClick={() =>    this.handleApply(this.props.team._id, this.props.history)}>
                                Join {this.props.team.name}
                            </Button>
                        </ListGroupItem>
                    );
                }  
            }
        
            else if (this.props.currentTeam._id && this.props.currentTeam._id === this.props.team._id)
            {
                return (
                    <ListGroupItem className="text-center">
                        <h4>You are currently a member of this team.</h4>
                        <Button bsStyle="info" bsSize="lg" className="button-section" onClick={() => this.handleLeave(this.props.team._id, this.props.history)}>
                            Leave {this.props.team.name}
                        </Button>
                    </ListGroupItem>
                );
            }
        }

        return '';
    }

    render() 
    {
        if (this.props.loading) return (<Loading />);
                                        
        else if (!this.props.team || !this.props.team.name) return (<NotFound />); 
                                                                    
        else return (
            <div className="teams-view">

                <PageHeader history={this.props.history} title={ this.props.team && this.props.team.name } />

                <Row>
                    <Col xs={12}>

                        { Roles.userIsInRole( Meteor.userId(), ['admin']) ? <ViewTeamTools history={this.props.history} match={this.props.match} /> : '' }

                    </Col>
                </Row>        

                <Row>

                    <Col xs={12} sm={6} md={4}>            

                            <h4 className="text-muted">Roster</h4>                       
                            <ListGroup fill>
                                    { 
                                        this.props.team && this.props.team.members && this.props.team.members.length ? this.props.team.members.map((id) => (

                                            <ListGroupItem key={id} className="text-info">

                                                <Link key={`roster${id}`} to={`/profile/${id}`}>
                                                    { 
                                                        Meteor.users.findOne(id).profile.username 
                                                    }
                                                </Link>

                                                <ButtonGroup className="pull-right" bsSize="xsmall">

                                                    <Button bsStyle="success" onClick={() => this.handleAcceptApplication(this.props.team._id, id, this.props.history)}>
                                                        Promote
                                                    </Button>

                                                    <Button bsStyle="danger" onClick={() => this.handleRemoveUserFromTeam(this.props.team._id, id, this.props.history)}>
                                                        Remove
                                                    </Button>

                                                </ButtonGroup>

                                            </ListGroupItem>
                                        )) : 'No team members yet'    
                                    }
                            </ListGroup> 

                            <h4 className="text-muted">Applications</h4>                    
                            <ListGroup fill>
                                    { 
                                        this.props.team && this.props.team.applications && this.props.team.applications.length ? this.props.team.applications.map((id) => (

                                            <ListGroupItem key={`applications{id}`} className="text-info">

                                                <Link to={`/profile/${id}`}>
                                                    { 
                                                        Meteor.users.findOne(id).profile.username 
                                                    }
                                                </Link>

                                                <ButtonGroup className="pull-right" bsSize="xsmall">

                                                    <Button bsStyle="success" onClick={() => this.handleAcceptApplication(this.props.team._id, id, this.props.history)}>
                                                        Accept
                                                    </Button>

                                                    <Button bsStyle="danger" onClick={() => this.handleDenyApplication(this.props.team._id, id, this.props.history)}>
                                                        Deny
                                                    </Button>

                                                </ButtonGroup>

                                            </ListGroupItem>
                                        )) : 'No applications'    
                                    }
                            </ListGroup>

                            <ListGroup fill> 
                                { this.getUserTeamStatus() }
                            </ListGroup>

                    </Col>

                    <Col xs={12} sm={6} md={4}>

                        {/* Team info */}
                        <h4 className="text-muted">Team Information</h4>
                        <ListGroup fill>
                            <ListGroupItem key={1} header="Abbreviation" className="text-primary" >{this.props.team && this.props.team.abbreviation}</ListGroupItem>
                            <ListGroupItem key={2} header="Wins" className="text-primary" >No data available</ListGroupItem>
                            <ListGroupItem key={3} header="Losses" className="text-primary" >No data available</ListGroupItem>
                            <ListGroupItem key={4} header="Games Played" className="text-primary" >No data available</ListGroupItem>
                            <ListGroupItem key={6} header="Website" className="text-primary" >{this.props.team && this.props.team.website}</ListGroupItem>
                            <ListGroupItem key={7} header="Created" className="text-primary" >{this.props.team && moment(this.props.team.createdAt).calendar()}</ListGroupItem>
                        </ListGroup>

                    </Col>

                    <Col xsHidden smHidden md={4}>

                        {/* Emblem */} 
                        <div id="teams-view-emblem">
                            <FontAwesome name="users" />                                  
                        </div>

                        {/* Team description */}       
                        { 
                            this.props.team && this.props.team.description ?  
                                <blockquote className="blockquote">
                                    { this.props.team.description }
                                </blockquote>
                            : ''
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}

ViewTeam.propTypes = {
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    currentTeam: PropTypes.object,
    applicant: PropTypes.object,
};

export default createContainer(({ match }) => {
    const teamId = match.params._id;
    const subscription = Meteor.subscribe('teams.view', teamId);
    return {
        loading: !subscription.ready(),
        team: TeamsCollection.findOne(teamId) || {},
        currentTeam: TeamsCollection.findOne({ members: { $in: [Meteor.userId()] } }),
        applicant: TeamsCollection.findOne({ applications: { $in: [Meteor.userId()] } }),
    };
}, ViewTeam);
