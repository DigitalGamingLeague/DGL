import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Index from '/imports/ui/pages/Index/Index';
import Dashboard from '/imports/ui/pages/Admin/Dashboard';

import Documents from '/imports/ui/pages/Documents/Documents';
import NewDocument from '/imports/ui/pages/Documents/NewDocument';
import ViewDocument from '/imports/ui/pages/Documents/ViewDocument';
import EditDocument from '/imports/ui/pages/Documents/EditDocument';

import Community from '/imports/ui/pages/Community/Community';
import Profile from '/imports/ui/pages/Community/Members/Profile';
import ProfileEdit from '/imports/ui/pages/Community/Members/ProfileEdit';
import Members from '/imports/ui/pages/Community/Members/Members';
import Teams from '/imports/ui/pages/Community/Teams/Teams';
import ViewTeam from '/imports/ui/pages/Community/Teams/ViewTeam';
import CreateTeam from '/imports/ui/pages/Community/Teams/CreateTeam';
import Staff from '/imports/ui/pages/Community/Staff/Staff';

import Signup from '/imports/ui/pages/Authentication/Signup';
import Login from '/imports/ui/pages/Authentication/Login';
import Logout from '/imports/ui/pages/Authentication/Logout';
import RecoverPassword from '/imports/ui/pages/Authentication/RecoverPassword';
import ResetPassword from '/imports/ui/pages/Authentication/ResetPassword';

import Games from '/imports/ui/pages/Games/Games';

import NotFound from '/imports/ui/pages/Misc/NotFound';
import Denied from '/imports/ui/pages/Misc/Denied';
import Terms from '/imports/ui/pages/Misc/Terms';
import Privacy from '/imports/ui/pages/Misc/Privacy';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
        <Grid>
            <Navigation {...props} />
            <Row>
                <Col className="content" xs={12}>
                    <Switch>
                        <Any exact path="/" component={Index} />
                        <Admin exact path="/admin" component={Dashboard} {...props} />
    
                        <Admin exact path="/documents" component={Documents} {...props} />
                        <Admin exact path="/documents/new" component={NewDocument} {...props} />
                        <Any exact path="/documents/:_id" component={ViewDocument} {...props} />
                        <Admin exact path="/documents/:_id/edit" component={EditDocument} {...props} />
    
                        <Any exact path="/community" component={Community} {...props} />
                        <Any exact path="/members" component={Members} {...props} />
                        <Authenticated exact path="/profile" component={Profile} {...props} />
                        <Authenticated exact path="/profile/edit" component={ProfileEdit} {...props} />
                        <Any exact path="/profile/:_id" component={Profile} {...props} />
                        <Any exact path="/teams" component={Teams} {...props} />
                        <Authenticated exact path="/teams/new" component={CreateTeam} {...props} />
                        <Any exact path="/teams/:_id" component={ViewTeam} {...props} />
                        <Any path="/staff" component={Staff} />
    
                        <Public path="/signup" component={Signup} {...props} />
                        <Public path="/login" component={Login} {...props} />
                        <Public path="/logout" component={Logout} {...props} />
                        <Any path="/recover-password" component={RecoverPassword} />
                        <Any path="/reset-password/:token" component={ResetPassword} />
    
                        <Any exact path="/games" component={Games} {...props} />
    
                        <Any path="/terms" component={Terms} />
                        <Any path="/privacy" component={Privacy} />
                        <Any path="/denied" component={Denied} />
                        <Any component={NotFound} />
                    </Switch>
                </Col>
            </Row>
        </Grid>
        <Footer />
    </div> : ''}
  </Router>
);

const Any = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={
        props => (
        React.createElement(component, { ...props, loggingIn, authenticated })
    )}
  />
);

const Admin = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Roles.userIsInRole( Meteor.userId(), ['admin']) ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to="/denied" />)
    )}
  />
);

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to="/logout" />)
    )}
  />
);

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to="/" />)
    )}
  />
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default createContainer(() => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const loading = !Roles.subscription.ready();
    const name = user && user.profile && user.profile.username;
    const emailAddress = user && user.emails && user.emails[0].address;

    return {
        loading,
        loggingIn,
        authenticated: !loggingIn && !!userId,
        name: name || emailAddress,
        roles: !loading && Roles.getRolesForUser(userId),
    };
}, App);
