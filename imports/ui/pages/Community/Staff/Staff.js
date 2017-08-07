import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '/imports/ui/components/Loading/Loading';
import FontAwesome from 'react-fontawesome';
import PageHeader from '/imports/ui/components/PageHeader/PageHeader';

const Staff = ({history, staff, loading}) => (!loading ? ( 
    <div className="Staff">
    
        <PageHeader history={history} title="Staff"  />
    
        <Row>
            <Col xs={12} md={6}>

                { staff.length ? (<ListGroup id="staff-list">
                    { staff.map( ({ _id, profile }) => (
                        <ListGroupItem key={ _id }>
                            <h4>
                                <Link to={`/profile/${_id}`}>{ profile.username }</Link>
                            </h4>
                        </ListGroupItem>
                    ))}
                    </ListGroup>) : ''
                }
            </Col>
            <Col xs={12} md={6}>
                Interesting joining the staff? Blah blah blah.                            
            </Col>

        </Row>
    </div>
) : <Loading />);

Staff.propTypes = {
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    staff: PropTypes.array.isRequired,
};

export default createContainer(() => {
    const subscription = Meteor.subscribe('users.staff');
    return {
        loading: !subscription.ready(),
        staff: Meteor.users.find().fetch(),
    };
}, Staff);
