import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem, Accordion, Panel, ButtonToolbar, ButtonGroup, Button, Badge } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import Breadcrumbs from '../../components/PageHeader/Breadcrumbs';
import DocumentsCollection from '../../../api/Documents/Documents';
import Loading from '../../components/Loading/Loading';
                                     
class Dashboard extends React.Component {
    
    constructor(props) 
    {
        super(props);
    }
    
    
    handleDocumentRemove = (documentId) => {
    if (confirm('Are you sure? This is permanent!')) {
        Meteor.call('documents.remove', documentId, (error) => {
                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('Document deleted!', 'success');
                }
            });
        }
    };    

    handleMemberRemove = (userId) => {
    if (confirm('Are you sure? This is permanent!')) {
        Meteor.call('users.delete', userId, (error) => {
                if (error) 
                {
                    Bert.alert(error.reason, 'danger');
                } 
                else 
                {
                    Bert.alert('User deleted!', 'success');
                }
            });
        }
    };
                                       
    render() {
        const { history, loading, documents, members } = this.props;
        
        return (
    
            <div className="Dashboard">

                <Row>
                    <Col xs={12}>
                        <Breadcrumbs title="Admin" history={history} />
                    </Col>
                </Row>
                <Row>
            
                    <Col xsHidden sm={3} md={2}>
                        <ListGroup>
                            <ListGroupItem>
                                Documents
                            </ListGroupItem>
                            <ListGroupItem>
                                Members
                            </ListGroupItem>
                            <ListGroupItem>
                                Teams
                            </ListGroupItem>
                            <ListGroupItem>
                                Games
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
            
                    <Col xs={12} sm={9} md={10}>
            
                        <Panel className="dashboard-section">
                            <Col sm={12} md={3}>
                                <h4>Documents</h4>
            
                                <Button bsStyle="success" block onClick={() => history.push('/documents/new')}>
                                    New Document
                                </Button>
                                <Button bsStyle="default" block onClick={() => history.push('/documents')}>
                                    Document List
                                </Button>
                            </Col>
                            <Col sm={12} md={9}>
                                <h6>Last 5 Documents</h6>
                                
                                <Accordion>
                                {
                                    documents.map(({ _id, title, body, owner, createdAt, updatedAt }) => (
                                            <Panel bsStyle="default" eventKey={_id} key={_id} header={title}>
                                                <h6>{ Meteor.users.findOne(owner).profile.username } <small> { moment(createdAt).calendar() } </small></h6>

                                                <p>{body}</p>

                                                <ButtonToolbar className="pull-right">
                                                    <ButtonGroup bsSize="small">
                                                        
                                                        <Button onClick={() => history.push(`/documents/${_id}`)} bsStyle="default">
                                                            View
                                                        </Button>

                                                        <Button onClick={() => history.push(`/documents/${_id}/edit`)} bsStyle="warning">
                                                            Edit
                                                        </Button>

                                                        <Button onClick={() => this.handleDocumentRemove(_id, history)} bsStyle="danger">
                                                            Delete
                                                        </Button>

                                                    </ButtonGroup>
                                                </ButtonToolbar>
                                            </Panel>
                                    ))
                                }
                                </Accordion>
                            </Col>
                        </Panel>

                        <Panel className="dashboard-section">
                            <Col sm={12} md={3}>
                                <h4>Members</h4>

                                <Button bsStyle="success" block onClick={() => history.push('/members/new')}>
                                    New Member
                                </Button>
                                <Button bsStyle="default" block onClick={() => history.push('/members')}>
                                    Member list
                                </Button>
                            </Col>
                            <Col sm={12} md={9}>
                                <h6>Last 5 Members</h6>
                                
                                <Accordion>
                                {
                                    members.map(({ _id, profile, createdAt, status, emails, roles }) => (
                                            <Panel bsStyle="default" eventKey={_id} key={_id} header={profile && profile.username}>

                                                <h6>Registered</h6>
                                                <p key={`createdAt${_id}`}>{ createdAt && moment(createdAt).calendar() }</p>

                                                <h6>E-mail</h6>
                                                {  
                                                    emails && emails.map(({ address, verified }, i) => (
                                                        <p key={`email${i}${_id}`}>{address}</p>
                                                    ))
                                                }

                                                <h6>Roles</h6>
                                                {  
                                                    roles && roles.map(( role, i ) => ( 
                                                        <Badge key={`role${i}${_id}`}>{role._id}</Badge>
                                                    ))
                                                }

                                                <h6>Last online</h6>
                                                <p key={`lastlogin${_id}`}>
                                                    { 
                                                        status && status.lastLogin ? moment(status.lastLogin.date).calendar()
                                                        : 'Never'
                                                    }
                                                </p>

                                                <ButtonToolbar className="pull-right">
                                                    <ButtonGroup bsSize="small">
                                                        
                                                        <Button onClick={() => history.push(`/profile/${_id}`)} bsStyle="default">
                                                            View
                                                        </Button>

                                                        <Button onClick={() => history.push(`/profile/${_id}/edit`)} bsStyle="warning">
                                                            Edit
                                                        </Button>

                                                        <Button onClick={() => this.handleMemberRemove(_id, history)} bsStyle="danger">
                                                            Delete
                                                        </Button>

                                                    </ButtonGroup>
                                                </ButtonToolbar>
                                                                       
                                            </Panel>
                                    ))
                                }
                                </Accordion>

                            </Col>
                        </Panel>

                        <Panel className="dashboard-section">
                            <Col sm={12} md={3}>
                                <h4>Roles</h4>

                                <Button bsStyle="success" block onClick={() => history.push('/roles/new')}>
                                    New Role
                                </Button>
                                <Button bsStyle="default" block onClick={() => history.push('/roles')}>
                                    Roles list
                                </Button>
                            </Col>
                            <Col sm={12} md={9}>
                                Something...
                            </Col>
                        </Panel>
                    </Col>
                </Row>

            </div>
        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired,
    documents: PropTypes.arrayOf(PropTypes.object).isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('dashboard.summary');

    return {
        loading: !subscription.ready(),
        documents: DocumentsCollection.find({},{sort: { createdAt: -1 }}).fetch(),
        members: Meteor.users.find({},{sort: { createdAt: -1 }}).fetch(),
    };
}, Dashboard);

