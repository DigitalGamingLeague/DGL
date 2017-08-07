import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Breadcrumbs from '../../components/PageHeader/Breadcrumbs';

const PageHeader = ({ title, subtitle, history }) => (
    <div className="page-header">
    
        <Row>
            <Col xs={12}>
                <Breadcrumbs title={title} history={history} />
            </Col>
        </Row>
    
        <Row>
            <Col xs={12}>
                <h1>
                    {title && title}
                    <small>
                        {subtitle && subtitle}
                    </small>
                </h1>
            </Col>
        </Row>
    </div>
);

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default PageHeader;
