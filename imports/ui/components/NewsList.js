import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents';
import container from '../../modules/container';
import FontAwesome from 'react-fontawesome';

const handleNav = _id => browserHistory.push(`/documents/${_id}`);

const NewsList = ({ documents }) => (
    documents.length > 0 ? <ListGroup id="news-list">
        {documents.map(({ _id, title, body }) => (
            <ListGroupItem>
                <h4 key={ _id } onClick={ () => handleNav(_id) }>{ title }</h4>
                <p>{ body }</p>
                <div className='more' onClick={ () => handleNav(_id) }>
                    read more ...
                </div>
            </ListGroupItem>
        ))}
    </ListGroup> :
    <Alert bsStyle="warning">No news yet.</Alert>
);

NewsList.propTypes = {
  documents: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('documents.list');
  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  }
}, NewsList);
