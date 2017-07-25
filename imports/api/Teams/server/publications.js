import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from '../Teams';
import { publishComposite } from 'meteor/reywood:publish-composite';

Meteor.publish('teams', function teams() {
  return Teams.find();
});

// Note: teams.view is also used when editing an existing team.
Meteor.publish('teams.view', function teamsView(teamId) {
  check(teamId, String);
  return Teams.find({ _id: teamId });
});

publishComposite('teamsthingy', {
    find: function ()
    {
        // Find top ten highest scoring posts
        return Teams.find();
    },
    children: [
        {
            find: function (team) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Meteor.users.find(
                    { _id: team.owner },
                    { fields: { profile: 1 } 
                });
            }
        }
    ]
});