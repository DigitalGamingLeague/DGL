import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { timeago, monthDayYear,monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TeamsCollection from '/imports/api/Teams/Teams';
import Loading from '/imports/ui/components/Loading/Loading';
import FontAwesome from 'react-fontawesome';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';

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

function printTeamsData(teams) {
    const teamsArray = [];
    const quantity = teams.length;
    for (let i = 0; i < quantity; i++) {
        
        teamsArray.push({
            id: teams[i]._id,
            name: teams[i].name,
            abbreviation: teams[i].abbreviation,
            owner: getOwnerName(teams[i].owner),
            created: monthDayYear(teams[i].createdAt),
        });
    }
    return teamsArray;
};

const linkFormatter = (cell, row) => {
    const link = '/community/teams/' + row.id;
    return (
            <Link to={link}>
                {cell}
            </Link>
    )
}

const getOwnerName = (ownerId) => {
    const owner = Meteor.users.findOne({_id: ownerId});
    const ownerName = owner.profile.username;
    return ownerName;
};

const Teams = props => (!props.loading ? ( 
    <div className="teams">
        <PageHeader history={props.history} title="Teams"  />
    
        <Row>
            <TeamsListTable {...props } />        
    
            { props.authenticated ? <TeamsListPrivate  /> : <TeamsListPublic /> }
        </Row>
    </div>
) : <Loading />);

const TeamsListTable = ({ teams, match, history }) => (
    <Col xs={12} md={8}>

        <BootstrapTable data={ printTeamsData(teams) } bordered={ false } tableContainerClass='datatable-custom' search pagination>
            <TableHeaderColumn dataField="id" isKey={ true } hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataFormat={linkFormatter} dataSort>Team Name</TableHeaderColumn>
            <TableHeaderColumn dataField="abbreviation" dataSort>Abbreviation</TableHeaderColumn>
            <TableHeaderColumn dataField="owner" dataSort>Owner</TableHeaderColumn>
            <TableHeaderColumn dataField="created" dataSort>Created</TableHeaderColumn>
        </BootstrapTable>

    </Col>
);

const TeamsListPrivate = () => (

    <Col className="teams-info" xsHidden smHidden mdOffset={1} md={3}>

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
            You can also <Link to='/community/teams/new'>create your own team</Link> -- anyone can do it! 
        </p>
        <p>
            To participate in a tournament, your team must have at least 5 members enrolled.
        </p>
    </Col>
);

const TeamsListPublic = () => (

    <Col className="teams-info" xsHidden smHidden mdOffset={1} md={3}>

        <h2>Joining a Team</h2>

        <p>
            Before you can join a team, <Link to="/login">you must first login</Link>.
        </p>


        <h2>Creating a Team</h2>

        <p>
            You can also create your own team, but <Link to="/login">you must first login</Link>! 
        </p>
    </Col>
);

Teams.propTypes = {
    loading: PropTypes.bool.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('teams.list');
    return {
        loading: !subscription.ready(),
        teams: TeamsCollection.find().fetch(),
    };
}, Teams);
