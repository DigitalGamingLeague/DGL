import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import editProfile from './edit-profile';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      password: Match.Optional(Object),
      profile: {
        username: String,
      },
    });

    return editProfile({ userId: this.userId, profile })
    .then(response => response)
    .catch((exception) => {
      throw new Meteor.Error('500', exception);
    });
  },
});

rateLimit({
  methods: [
    'users.editProfile',
  ],
  limit: 5,
  timeRange: 1000,
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
      //console.log('Hello ' + id.profile.username);
      //console.log('IP: ' + id.status.lastLogin.ipAddr);
    // id just came online
  },
  removed: function(id) {
    // id just went offline
  }
});