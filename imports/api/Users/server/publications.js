import { Meteor } from 'meteor/meteor';

Meteor.publish('users.editProfile', function usersProfile() {
  return Meteor.users.find(this.userId, {
    fields: {
      emails: 1,
      profile: 1,
      services: 1,
    },
  });
});

Meteor.publish("users.status", function () {
    return Meteor.users.find(
        { 
            'status.online': true
        } 
        , 
        { 
            fields: 
            {
                'status.idle': 1,
                'status.online': 1,
                'profile.username': 1
            } 
        }
    );
});

Meteor.publish("users.viewSelf", function () {
    return Meteor.users.find(
        { 
            _id: this.userId
        } 
        , 
        { 
            fields: 
            {
                'status': 1,
                'createdAt': 1,
                'emails': 1,
                'profile': 1
            } 
        }
    );
});