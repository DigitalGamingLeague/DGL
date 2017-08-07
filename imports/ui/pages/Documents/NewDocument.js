import React from 'react';
import PropTypes from 'prop-types';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import { Row, Col} from 'react-bootstrap';
import PageHeader from '../../components/PageHeader/PageHeader';

const NewDocument = ({ history }) => (
    <div className="NewDocument">
        <Row>
            <Col xs={12}>
                <PageHeader title="New Document" history={history} />
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <DocumentEditor history={history} />
            </Col>
        </Row>
    </div>
);

NewDocument.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDocument;
