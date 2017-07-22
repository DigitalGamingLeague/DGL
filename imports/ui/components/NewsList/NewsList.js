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
    news.length ? <ListGroup id="news-list">
        { news.map( ({ _id, title, createdAt, body}) => (
            <ListGroupItem key={ _id }>
                <h4 onClick={ () => history.push(`/documents/${_id}`) }>
                    { title }
                    <small> {timeago(createdAt)} </small>
                </h4>
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

export default createContainer(() => {
    const subscription = Meteor.subscribe('news');
    return {
        loading: !subscription.ready(),
        news: NewsCollection.find().fetch(),
    };
}, NewsList);