import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';
import Teams from '../../Teams/Teams';

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
                'profile.username': 1,
            } 
        }
    );
});

publishComposite('users.list', function usersList() {
    
    return {
        find: function()
        {
            return Meteor.users.find({},                    
            { 
                fields: 
                {
                    'status': 1,
                    'createdAt': 1,
                    'profile': 1,
                } 
            });
        },
        children: [
            {
                find: function (u) {
                    
                    return Teams.find(
                        {
                            members: u._id 
                        },
                        { 
                            fields: 
                            { 
                                abbreviation: 1,
                                members: 1,
                            } 
                        }
                    );
                }
            }
        ]
    };
});

Meteor.publish("users.staff", function () {
    return Roles.getUsersInRole('staff');
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

Meteor.publish("users.view", function usersView(profileId) {
    
    check(profileId, String);
    
    return Meteor.users.find(
        { 
            _id: profileId
        } 
        , 
        { 
            fields: 
            {
                'status.online': 1,
                'status.idle': 1,
                'createdAt': 1,
                'profile': 1,
                'roles': 1,
            } 
        }
    );
});