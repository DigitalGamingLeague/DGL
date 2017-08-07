import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { timeago } from '@cleverbeagle/dates';
import { createContainer } from 'meteor/react-meteor-data';
import NewsCollection from '../../../api/Documents/Documents';
import Loading from '../../components/Loading/Loading';
import FontAwesome from 'react-fontawesome';

const NewsList = ({ loading, news, match, history }) => (!loading ? ( 
    news.length ? <ListGroup className="news-list">
        { news.map( ({ _id, title, createdAt, body, owner}) => (
    
            <ListGroupItem key={ _id }>
    
                <h4>
                    <Link to={`/documents/${_id}`}>
                        { title }
                    </Link>
                </h4>

                <h6>
                    Posted by <Link to={`/profile/${_id}`}>
                        { Meteor.users.findOne(owner).profile.username }
                    </Link> {timeago(createdAt)}
                </h6>

                <p>{ body }</p>

            </ListGroupItem>
        ))}
    </ListGroup> :
    <h4>No news yet.</h4>
) : <Loading />);

NewsList.propTypes = {
    loading: PropTypes.bool.isRequired,
    news: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default createContainer(({n, labels}) => {
    const subscription = Meteor.subscribe('documents.news', labels, n);
    return {
        loading: !subscription.ready(),
        news: NewsCollection.find().fetch(),
    };
}, NewsList);