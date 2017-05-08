import './accounts/email-templates';
import './browser-policy';
import './fixtures';
import './api';

import Twitter from 'twitter';

var Tweets = new Mongo.Collection('tweets');

var twitterClient = new Twitter({
    consumer_key: Meteor.settings.private.twitter.consumer_key,
    consumer_secret: Meteor.settings.private.twitter.consumer_secret,
    access_token_key: Meteor.settings.private.twitter.access_token_key,
    access_token_secret: Meteor.settings.private.twitter.access_token_secret
});

var stream = twitterClient.stream('statuses/filter', {follow: '2789620137'});
//var stream = twitterClient.stream('statuses/filter', {track: 'javascript'});

stream.on('data', function(event) {
    console.log(event);
});
 
stream.on('error', function(error) {
    console.log(error);
});

Meteor.publish('listTweets', function () {
     return Tweets.find();
});