import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { timeago, monthDayYear } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TeamsCollection from '../../../api/Teams/Teams';
import Loading from '../../components/Loading/Loading';
import FontAwesome from 'react-fontawesome';

const handleRemove = (teamId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('teams.remove', teamId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Team deleted!', 'success');
      }
    });
  }
};

const getOwnerName = (ownerId) => {
    const owner = Meteor.users.findOne({_id: ownerId});
    const ownerName = owner.profile.username;
    return ownerName;
};

const Teams = props => (!props.loading ? ( 
    <div>
        { 
            Roles.userIsInRole( Meteor.userId(), ['admin']) ? 
                <TeamsListAdmin {...props} /> : <TeamsListPublic {...props} />
        }
    </div>
) : <Loading />);

const TeamsListAdmin = ({ teams, match, history }) => (
    <div id="teams">
        <Col xs={12}>
            <div className="page-header clearfix">
                <h4 className="pull-left">Teams</h4>
                    <Link className="btn btn-success pull-right" to={'/teams/new'}>Add Team</Link>
                                                       
            </div>
            {teams.length ? <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Abbreviation</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {teams.map(({ _id, name, owner, abbreviation, createdAt }) => (
                    <tr key={_id}>
                        <td>{name}</td>
                        <td>{abbreviation}</td>
                        <td>{getOwnerName(owner)}</td>
                        <td>{monthDayYearAtTime(createdAt)}</td> 
                        <td>
                            <Button
                                bsStyle="primary"
                                onClick={() => history.push('/teams/${_id}')}
                                block>
                                View
                            </Button>
                        </td>
                        <td>
                            <Button
                            bsStyle="danger"
                            onClick={() => handleRemove(_id)}
                            block>
                                Delete
                            </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table> : <Alert bsStyle="warning">No teams yet!</Alert>}
        </Col>
    </div>
);

const TeamsListPublic = ({ teams, match, history }) => (
    <div className="teams">  
        <Row>
    
            <Col xs={12} md={8}>
    
                <h2>Teams</h2> 
    
                { teams.length ? <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Abbreviation</th>
                            <th>Owner</th>
                            <th>Created</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(({ _id, name, owner, abbreviation, createdAt }) => (
                        <tr key={_id}>
                            <td className="team-link" onClick={() => history.push(`/teams/${_id}`)} >
                                {name}
                            </td>
                            <td>{abbreviation}</td>
                            <td>{getOwnerName(owner)}</td>
                            <td>{monthDayYear(createdAt)}</td> 
                            <td className="team-info-buttons">
                                <Button bsSize="small" bsStyle="default" onClick={() => history.push(`/teams/${_id}`)}>View Team</Button>
                                <Button bsSize="small" bsStyle="info">Join Team</Button> 
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table> : <Alert bsStyle="warning">No teams yet!</Alert>}
            </Col>

            <Col className="teams-info" xsHidden smHidden md={4}>
                
                <h2>Joining a Team</h2>

                <p>
                    To participate in league events you will need to be part of a team.
                </p>

                <p> 
                    Join a team by selecting clicking the 'Join Team' button next to the team of your choice.   
                    The owner of the team will need to accept your join request.
                </p>

                
                <h2>Creating a Team</h2>

                <p>
                    You can also <Link to={'/teams/create'}>create your own team</Link> -- anyone can do it! 
                </p>
                <p>
                    To participate in a tournament, your team must have at least 5 members enrolled.
                </p>
            </Col>
        </Row>

    </div>
);

Teams.propTypes = {
  loading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('teamsthingy');
    return {
        loading: !subscription.ready(),
        teams: TeamsCollection.find().fetch(),
    };
}, Teams);
