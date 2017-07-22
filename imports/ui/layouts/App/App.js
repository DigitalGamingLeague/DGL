import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Sidebar from '../../components/Sidebar/Sidebar';
import Index from '../../pages/Index/Index';
import Documents from '../../pages/Documents/Documents';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Denied from '../../pages/Denied/Denied';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import NewsList from '../../components/NewsList/NewsList';
import Teams from '../../pages/Teams/Teams';
import CreateTeam from '../../pages/CreateTeam/CreateTeam';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
        <Grid fluid>
            <Navigation {...props} />
            <Row>
                <Col className="content" md={2} xsHidden smHidden>
                    <Sidebar {...props} />
                </Col>
                <Col className="content" xs={12} md={10}>
                    <Switch>
                        <Route exact name="index" path="/" component={Index} />
                        <Admin exact path="/documents" component={Documents} {...props} />
                        <Admin exact path="/documents/new" component={NewDocument} {...props} />
                        <Any exact path="/documents/:_id" component={ViewDocument} {...props} />
                        <Admin exact path="/documents/:_id/edit" component={EditDocument} {...props} />
                        <Authenticated exact path="/profile" component={Profile} {...props} />
                        <Any exact path="/teams" component={Teams} {...props} />
                        <Authenticated exact path="/teams/new" component={CreateTeam} {...props} />
                        <Public path="/signup" component={Signup} {...props} />
                        <Public path="/login" component={Login} {...props} />
                        <Public path="/logout" component={Logout} {...props} />
                        <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
                        <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
                        <Route name="terms" path="/terms" component={Terms} />
                        <Route name="privacy" path="/privacy" component={Privacy} />
                        <Route name="examplePage" path="/example-page" component={ExamplePage} />
                        <Route name="denied" path="/denied" component={Denied} />
                        <Route component={NotFound} />
                    </Switch>
                </Col>
            </Row>
        </Grid>
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
