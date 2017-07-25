import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col, Panel, ListGroup, ListGroupItem, Popover, OverlayTrigger } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import Teams from '../../../api/Teams/Teams';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import FontAwesome from 'react-fontawesome';

const constructionWarning = (
    <Popover className="construction-warning" title="Under Construction">
        Sorry, this is disabled while the site is under construction. 
    </Popover>
);

const handleRemove = (teamId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
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

const ViewTeam = ({ loading, team, match, history }) => (!loading ? (
    <div className="teams-view">
        <Row>
            <Col xs={12}>
                <Button className="back-button" onClick={history.goBack} bsStyle="primary">
                    <FontAwesome name="arrow-circle-left" /> Back
                </Button>
            </Col>
        </Row>
        
        <Row>
            <Col xs={12} md={8}>
                { Roles.userIsInRole( Meteor.userId(), ['admin']) ? <ViewTeamTools history={history} match={match} /> : '' }

                 <h2>{ team && team.name } <small>[{team && team.abbreviation}]</small></h2>
            </Col>
        </Row>
                                                         
        <Row>
            <Col xs={12} md={8}>
                                                         
                <Panel header="Team Members" bsStyle="info" collapsible defaultExpanded>
                    <ListGroup fill>
                        <ListGroupItem>Playername</ListGroupItem>
                    </ListGroup>
                </Panel>
                                                         
                <Panel header="Team Statistics" bsStyle="primary" collapsible defaultExpanded>
                    <ListGroup fill>
                        <ListGroupItem header="Wins">No data available</ListGroupItem>
                        <ListGroupItem header="Losses">No data available</ListGroupItem>
                        <ListGroupItem header="Games Played">No data available</ListGroupItem>
                        <ListGroupItem header="Last Tournament">No data available</ListGroupItem>
                        <ListGroupItem header="Website">{team && team.website}</ListGroupItem>
                        <ListGroupItem header="Registered">{team && team.createdAt}</ListGroupItem>
                    </ListGroup>
                </Panel>
            </Col>
                                                         
            <Col xsHidden smHidden md={4}>
                <OverlayTrigger placement="left" overlay={constructionWarning}>
                    <div id="teams-view-emblem">
                        <FontAwesome name="users" />                                  
                    </div>
                </OverlayTrigger>
            </Col>
        </Row>
                                                            
    </div>
) : <Loading />);
                                                                                  
const ViewTeamTools = ({ match, history}) => (
    <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(team._id, history)} bsStyle="danger">
            Delete
            </Button>
        </ButtonGroup>
    </ButtonToolbar>
);

ViewTeam.propTypes = {
    loading: PropTypes.bool.isRequired,
    team: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const teamId = match.params._id;
  const subscription = Meteor.subscribe('teams.view', teamId);

  return {
    loading: !subscription.ready(),
    team: Teams.findOne(teamId) || {},
  };
}, ViewTeam);
