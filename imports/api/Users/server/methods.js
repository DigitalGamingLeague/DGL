import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import editProfile from './edit-profile';
import rateLimit from '../../../modules/rate-limit';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
    'users.editProfile': function usersEditProfile(profile) {
        check(profile, {
            emailAddress: String,
            password: Match.Optional(Object),
            profile: {
                username: String,
                description: String,
                ign: String,
                twitch: String,
                youtube: String,
                steam: String,
                website: String,
            },
        });

        return editProfile({ userId: this.userId, profile })
            .then(response => response)
            .catch((exception) => {
                throw new Meteor.Error('500', exception);
            }
        );
    },   
    
    'users.delete': function userDelete(id) {
        check(id, String);

        try 
        {
            return meteor.users.remove( { _id : id } ); 
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
});

rateLimit({
    methods: [
        'users.editProfile',
        'users.delete',
    ],
    limit: 5,
    timeRange: 1000,
});

/*
Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
      //console.log('Hello ' + id.profile.username);
      //console.log('IP: ' + id.status.lastLogin.ipAddr);
      if (Roles.userIsInRole( id, ['admin'])) console.log('Admin: ' + id.profile.username);
      else console.log(id.profile.username);
  },
  removed: function(id) {
    // id just went offline
  }
});*/