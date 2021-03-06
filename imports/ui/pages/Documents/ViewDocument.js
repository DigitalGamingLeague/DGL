import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import Documents from '../../../api/Documents/Documents';
import NotFound from '/imports/ui/pages/Misc/NotFound';
import Loading from '../../components/Loading/Loading';

const handleRemove = (documentId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        history.push('/documents');
      }
    });
  }
};

const ViewDocument = ({ loading, doc, match, history }) => (!loading ? (
    <div className="ViewDocument">
    
        <Button onClick={history.goBack} bsStyle="primary">Back</Button>
    
        <div className="page-header clearfix">
    
            { Roles.userIsInRole( Meteor.userId(), ['admin']) ? <ViewDocumentTools history={history} match={match} /> : '' }
    
             <h4 className="pull-left">{ doc && doc.title }</h4>            
                                                            
        </div>
                
        { doc && doc.body }
                                                            
    </div>
) : <Loading />);
                                                                    
const ViewDocumentTools = ({ match, history}) => (
    <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(doc._id, history)} bsStyle="danger">
            Delete
            </Button>
        </ButtonGroup>
    </ButtonToolbar>
);

ViewDocument.propTypes = {
    loading: PropTypes.bool.isRequired,
    doc: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  return {
    loading: !subscription.ready(),
    doc: Documents.findOne(documentId) || {},
  };
}, ViewDocument);
