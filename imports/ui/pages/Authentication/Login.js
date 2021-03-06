import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { createContainer } from 'meteor/react-meteor-data';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

    handleSubmit() {
        const { history } = this.props;

        Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Welcome back!', 'success');
                history.push('/');
            }
        });
  }

  render() {
    return (<div className="Login">
      <Row>
        <Col xs={12} sm={6} md={5} lg={4}>
          <h4 className="page-header">Log In</h4>
            {/* OAuth 
            <Row>
            <Col xs={12}>
              <OAuthLoginButtons
                services={['facebook', 'google']}
                emailMessage={{
                  offset: 100,
                  text: 'Log In with an Email Address',
                }}
              />
            </Col>
          </Row>
          */}
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <input
                type="email"
                name="emailAddress"
                tabIndex="1"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span>Password</span>
                <Link className="forgot-password" to="/recover-password" tabIndex="4">Forgot password?</Link>
              </ControlLabel>
              <input
                tabIndex="2"
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
            </FormGroup>
            <Button tabIndex="3" type="submit" bsStyle="primary">Log In</Button>
            <AccountPageFooter>
              <p>{'Don\'t have an account?'} <Link to="/signup" tabIndex="5">Sign Up</Link>.</p>
            </AccountPageFooter>
          </form>
        </Col>
      </Row>
    </div>);
  }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Login;
