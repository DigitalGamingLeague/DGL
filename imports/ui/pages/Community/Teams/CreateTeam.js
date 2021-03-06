import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import InputHint from '/imports/ui/components/InputHint/InputHint';
import validate from '/imports/modules/validate';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';

class CreateTeam extends React.Component {
    constructor(props) 
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() 
    {
        const component = this;

        validate(component.form, {
            rules: 
            {
                name: 
                {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                abbreviation: 
                {
                    required: true,
                    minlength: 2,
                    maxlength: 4,
                },
                website: 
                {
                    required: false,
                    url: true,
                },
                description: 
                {
                    required: false,
                    maxlength: 300,
                },
            },
            messages: 
            {
                name: 
                {
                    required: 'What\'s your team name?',
                    minlength: 'Please use at least 2 characters.',
                    maxlength: 'Please use no more than 16 characters.',
                },
                abbreviation: 
                {
                    required: 'Need a team abbreviation',
                    minlength: 'Please use at least 2 characters.',
                    maxlength: 'Please use no more than 4 characters.',                
                },
                website: 
                {
                    url: 'Please use a valid URL',              
                },
                description: 
                {
                    maxlength: 'Please do not exceed 300 characters.',         
                },
            },
          submitHandler() { component.handleSubmit(); },
        });
    }

    handleSubmit() 
    {
        const { history } = this.props;
        const existingTeam = this.props.team && this.props.team._id;
        const methodToCall = existingTeam ? 'teams.update' : 'teams.insert';
        const team = {
            name: this.name.value.trim(),
            abbreviation: this.abbreviation.value.trim(),
            website: this.website.value.trim(),
            description: this.description.value.trim(),
        };

        if (existingTeam) team._id = existingTeam;

        Meteor.call(methodToCall, team, (error, teamId) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            const confirmation = existingTeam ? 'Team updated!' : 'Team added!';
            this.form.reset();
            Bert.alert(confirmation, 'success');
            history.push(`/community/teams/${teamId}`);
          }
        });
    }

    render() {
        const { history } = this.props;
        
        return (
            <div className="teams-create">
                
                <PageHeader history={history} title="Create Team" />
                
                <Row>
                    <Col xs={12} sm={6} md={5} lg={4}>

                        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>

                            <Row>
                                <Col xs={6}>
                                    <FormGroup>
                                        <ControlLabel>Team Name</ControlLabel>
                                        <input
                                        type="text"
                                        name="name"
                                        ref={name => (this.name = name)}
                                        className="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <ControlLabel>Abbreviation</ControlLabel>
                                <input
                                type="text"
                                name="abbreviation"
                                ref={abbreviation => (this.abbreviation = abbreviation)}
                                className="form-control"
                                />
                                <InputHint><i>Short name (e.g., a clan tag)</i></InputHint>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Website <i>optional</i></ControlLabel>
                                <input
                                type="url"
                                name="website"
                                ref={website => (this.website = website)}
                                className="form-control"
                                />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Team Description <i>optional</i></ControlLabel>
                                <textarea
                                name="description"
                                ref={description => (this.description = description)}
                                className="form-control"
                                placeholder="Tell us about your team."
                                />
                            </FormGroup>

                            <Button type="submit" bsStyle="success">Create</Button>
                        </form>
                    </Col>

                    <Col className="teams-info" xsHidden smHidden md={7} lg={8}>

                        <h2>Creating a Team</h2>

                        <p>
                            To participate in league events you will need to be part of a team.
                        </p>

                        <p> 
                            Create a team by entering the information on the left.
                            Players may join your team after it has been created.
                        </p>

                        <br />
                        <br />

                        <p> 
                            By creating a team you agree to the rules and conditions outlined in our <Link to="/rules">rules</Link>.
                        </p>

                    </Col>
                </Row>
            </div>);
      }
}

CreateTeam.propTypes = {
    history: PropTypes.object.isRequired,
};

export default CreateTeam;
