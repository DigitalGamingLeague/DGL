import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from '../Teams';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('teams', function teams() {
  return Teams.find();
});

publishComposite('teams.view', function teamsView(teamId) {
    
    check(teamId, String);
    
    return {
        find: function()
        {
            return Teams.find( { _id: teamId } );
        },
        children: [
            {
                find: function (team) {
                    
                    return Meteor.users.find({
                            _id: { $in: team.members } 
                        },
                        { 
                            fields: { profile: 1 } 
                    });
                }
            }
        ]
    };
});


publishComposite('teams.list', {
    find: function ()
    {
        return Teams.find();
    },
    children: [
        {
            find: function (team) {
                return Meteor.users.find(
                    { _id: team.owner },
                    { fields: { profile: 1 } 
                });
            }
        }
    ]
});