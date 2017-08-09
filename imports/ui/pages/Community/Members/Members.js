import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { timeago, monthDayYear } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '/imports/ui/components/Loading/Loading';
import FontAwesome from 'react-fontawesome';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';
import Teams from '/imports/api/Teams/Teams';

const Members = props => (!props.loading ? ( 
    <div className="members">
    
        <PageHeader history={props.history} title="Members"  />
    
        { 
            Roles.userIsInRole( Meteor.userId(), ['admin']) ? 
                <MembersListAdmin {...props} /> : <MembersListPublic {...props} />
        }
    </div>
) : <Loading />);

function getTeam(id)
{
    var team = Teams.findOne({members: id});
    return team && team.abbreviation;
}
                          
function printUsersData(members) {
    const users = [];
    const quantity = members.length;
    for (let i = 0; i < quantity; i++) {
        
        users.push({
            id: members[i]._id,
            name: members[i].profile.username,
            team: getTeam(members[i]._id),
            clan: members[i].profile.clan,
            createdAt: monthDayYear(members[i].createdAt),
        });
    }
    return users;
};

const buttonFormatter = (cell) => {
    const link = '/profile/' + cell;
    return (
            <Link to={link}>
                View Profile
            </Link>
    )
}

const linkFormatter = (cell, row) => {
    const link = '/profile/' + row.id;
    return (
            <Link to={link}>
                {cell}
            </Link>
    )
}

const MembersListAdmin = ({ members, match, history }) => (
  
    <Row>

        <Col xs={12} md={12}>

            <BootstrapTable data={ printUsersData(members) } bordered={ false } tableContainerClass='datatable-custom' search pagination>
                <TableHeaderColumn dataField="id" isKey={ true } hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataFormat={linkFormatter} dataSort>Username</TableHeaderColumn>
                <TableHeaderColumn dataField="team" dataSort>Team</TableHeaderColumn>
                <TableHeaderColumn dataField="clan" dataSort>Clan</TableHeaderColumn>
                <TableHeaderColumn dataField="createdAt" dataSort>Registered</TableHeaderColumn>
                <TableHeaderColumn dataField="id" dataFormat={buttonFormatter}  dataAlign="right"></TableHeaderColumn>
            </BootstrapTable>

        </Col>
    </Row>
);

const MembersListPublic = ({ members, match, history }) => (
    
    <Row>
    
        <Col xs={12} md={8}>

            <BootstrapTable data={ printUsersData(members) } bordered={ false } tableContainerClass='datatable-custom' search pagination>
                <TableHeaderColumn dataField="id" isKey={ true } hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataFormat={linkFormatter} dataSort>Username</TableHeaderColumn>
                <TableHeaderColumn dataField="team" dataSort>Team</TableHeaderColumn>
                <TableHeaderColumn dataField="clan" dataSort>Clan</TableHeaderColumn>
                <TableHeaderColumn dataField="createdAt" dataSort>Registered</TableHeaderColumn>
                <TableHeaderColumn dataField="id" dataFormat={buttonFormatter} dataAlign="right"></TableHeaderColumn>
            </BootstrapTable>

        </Col>
    
        <Col xsHidden smHidden mdOffset={1} md={3}>
            
            <h2>Join the League</h2>

            <p>
                If you would like to join the league, you just need to <Link to="/signup">sign-up here</Link>. Then, you can join a team and participate in league events.
            </p>

        </Col>

    </Row>
);

Members.propTypes = {
    loading: PropTypes.bool.isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('users.list');
    return {
        loading: !subscription.ready(),
        members: Meteor.users.find().fetch(),
    };
}, Members);
