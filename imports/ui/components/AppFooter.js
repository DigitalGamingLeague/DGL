import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, FormGroup, FormControl, InputGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';
import FontAwesome from 'react-fontawesome';

const AppFooter = ({ hasUser }) => (
    <div>hi</div>           
);

AppFooter.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppFooter);
