import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
    
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>
            Logout
        </MenuItem>

        <MenuItem divider/>
            
        <MenuItem eventKey={ 3.2 } href="/documents">
             Admin Panel
        </MenuItem>

      </NavDropdown> 
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
