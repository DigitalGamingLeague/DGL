import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        username: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        username: {
          required: 'What\'s your username?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;

    Accounts.createUser({
      email: this.emailAddress.value,
      password: this.password.value,
      profile: {
        username: this.username.value
      },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome to the BCL!', 'success');
        history.push('/');
      }
    });
  }

  render() {
    return (<div className="Signup">
      <Row>
        <Col xs={12} sm={6} md={5} lg={4}>
          <h4 className="page-header">Sign Up</h4>
            {/* OAuth 
          <Row>
            <Col xs={12}>
              <OAuthLoginButtons
                services={['facebook', 'github', 'google']}
                emailMessage={{
                  offset: 97,
                  text: 'Sign Up with an Email Address',
                }}
              />
            </Col>
          </Row>
          */}
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <input
                    type="text"
                    name="username"
                    ref={username => (this.username = username)}
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <input
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
              <InputHint>Use at least six characters.</InputHint>
            </FormGroup>
            <Button type="submit" bsStyle="success">Sign Up</Button>
            <AccountPageFooter>
              <p>Already have an account? <Link to="/login">Log In</Link>.</p>
            </AccountPageFooter>
          </form>
        </Col>
        <Col xsHidden smHidden md={7} lg={8}>

            <h4>Terms of Service</h4>
            
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget dui porta, vehicula velit vel, dictum ipsum. Vivamus at ultrices neque, at venenatis mauris. Maecenas justo ex, euismod eu mi ut, fermentum lacinia metus. Suspendisse varius neque eu dui faucibus pellentesque. Mauris pellentesque lacus leo, id porta urna imperdiet quis. Nunc elementum elit luctus leo vestibulum pretium. Cras vestibulum pellentesque tristique.
            </p>

            <p>
                Donec pharetra ultricies mauris, in auctor justo porttitor at. Nullam dictum posuere tellus, vitae sagittis risus facilisis quis. Vestibulum diam elit, iaculis vel metus vitae, bibendum volutpat eros. Vestibulum libero est, imperdiet id ex at, egestas sagittis erat. Aenean posuere hendrerit convallis. Nam vel velit lacus. Nunc ultrices efficitur tempus. Sed vulputate dui ac nunc tincidunt sollicitudin. Suspendisse elit dui, porttitor nec scelerisque non, condimentum ac tellus. Fusce justo sapien, congue eu venenatis nec, imperdiet efficitur odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam molestie tortor elit, sed imperdiet magna efficitur eu. Pellentesque eu justo vel est elementum finibus. Fusce a nulla in tellus condimentum efficitur. Nunc ligula ipsum, fermentum eget ipsum in, bibendum vestibulum nisl.
            </p>
              
            <p>
                Mauris rhoncus scelerisque scelerisque. Nullam justo tellus, sollicitudin eget aliquam at, gravida vitae nisi. Quisque iaculis ullamcorper turpis id dapibus. Nullam tincidunt augue at mi dignissim rhoncus quis sit amet purus. Donec ac justo quis mi dignissim condimentum. Donec imperdiet molestie lobortis. Donec odio leo, malesuada nec risus non, sodales interdum purus. Praesent gravida consequat enim et luctus. Nunc vitae vehicula augue, sit amet fermentum purus. Morbi semper quam nec turpis semper facilisis. Suspendisse ut rhoncus massa. In nunc eros, ultrices id vehicula a, pretium ac justo.
            </p>      
              
              
              
        </Col>
      </Row>
    </div>);
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
