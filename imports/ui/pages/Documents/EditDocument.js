import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Documents from '../../../api/Documents/Documents';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import NotFound from '/imports/ui/pages/Misc/NotFound';
import PageHeader from '../../components/PageHeader/PageHeader';

const EditDocument = ({ doc, history }) => (doc ? (
  <div className="EditDocument">
        <Row>
            <Col xs={12}>
                <PageHeader title={`Editing "${doc.title}"`} history={history} />
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <DocumentEditor doc={doc} history={history} />
            </Col>
        </Row>
  </div>
) : <NotFound />);
                                            
EditDocument.propTypes = {
    doc: PropTypes.object,
    history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('documents.view', documentId);

    return {
        loading: !subscription.ready(),
        doc: Documents.findOne(documentId),
    };
}, EditDocument);
