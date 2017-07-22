import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TeamsCollection from '../../../api/Teams/Teams';
import Loading from '../../components/Loading/Loading';

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

const Teams = ({ loading, teams, teamOwner, match, history }) => (!loading ? (
    <div id="teams">
        <Col xs={12}>
            { 
                Roles.userIsInRole( Meteor.userId(), ['admin']) ? 
                    <div className="page-header clearfix">
                        <h4 className="pull-left">Teams</h4>
                        <Link className="btn btn-success pull-right" to={'/teams/new'}>Add Team</Link>
                    </div> 
                : '' 
            }
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
                        <td>{teamOwner.profile.username}</td>
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
) : <Loading />);

Teams.propTypes = {
  loading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default createContainer(() => {
    const subscription = Meteor.subscribe('teamsthingy');
    return {
        loading: !subscription.ready(),
        teams: TeamsCollection.find().fetch(),
        teamOwner: Meteor.users.findOne(this.owner),
    };
}, Teams);
