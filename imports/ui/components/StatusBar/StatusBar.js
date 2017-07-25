import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';


const StatusBar = ({count}) => (
    <div className="StatusBar">
        <span className="StatusBar-count">{count}</span> { (count == 1) ? 'user' : 'users' } online
    </div>
);

StatusBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('users.status');
  return {
    loading: !subscription.ready(),
    count: Meteor.users.find({ "status.online": true }).count(),
  };
}, StatusBar);
