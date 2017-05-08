import '/imports/startup/server';
import Twitter from 'twitter';

var twitterClient = new Twitter({
    consumer_key: Meteor.settings.private.twitter.consumer_key,
    consumer_secret: Meteor.settings.private.twitter.consumer_secret,
    access_token_key: Meteor.settings.private.twitter.access_token_key,
    access_token_secret: Meteor.settings.private.twitter.access_token_secret
});

twitterClient.get('statuses/user_timeline', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  //console.log(response);  // Raw response object. 
});