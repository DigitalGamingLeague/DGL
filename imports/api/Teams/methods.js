import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from './Teams';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
    'teams.insert': function teamsInsert(team) {
        
        check(team, {
            name: String,
            abbreviation: String,
            website: String,
            description: String,
        });
        
        try 
        {
            return Teams.insert({
                owner: this.userId, 
                members: [ this.userId ], 
                ...team });
        } 
        catch (exception) 
        {
            
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.update': function teamsUpdate(team) {
        
        check(team, {
            _id: String,
            name: String,
            abbreviation: String,
            website: String,
            description: String,
        });

        try 
        {
            const teamId = team._id;
            Teams.update(teamId, { $set: team });
            return teamId; // Return _id so we can redirect to team after update.
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.remove': function teamsRemove(teamId) {
        
        check(teamId, String);

        try 
        {
            return Teams.remove(teamId);
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.apply': function teamsApply(teamId) {
        
        check(teamId, String);

        try 
        {
            return Teams.update(teamId, { $addToSet: { applications: Meteor.userId() } });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.acceptApplication': function teamsAcceptApplication(teamId, applicantId) {
        
        check(teamId, String);
        check(applicantId, String);

        try 
        {
            return Teams.update(teamId, 
                { 
                    $addToSet: { members: applicantId }, 
                    $pull: { applications: applicantId } 
                });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.rejectApplication': function teamsRejectApplication(teamId, applicantId) {
        
        check(teamId, String);
        check(applicantId, String);

        try 
        {
            return Teams.update(teamId, 
                { 
                    $pull: { applications: applicantId } 
                });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.cancelApplication': function teamsCancelApplication(teamId) {
        
        check(teamId, String);

        try 
        {
            return Teams.update(teamId, 
                { 
                    $pull: { applications: Meteor.userId() } 
                });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.removeUser': function teamsRemoveUser(teamId, applicantId) {
        
        check(teamId, String);
        check(applicantId, String);

        try 
        {
            return Teams.update(teamId, 
                { 
                    $pull: { members: applicantId } 
                });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
    'teams.leave': function teamsLeave(teamId) {
        
        check(teamId, String);

        try 
        {
            return Teams.update(teamId, { $pull: { members: Meteor.userId() } });
        } 
        catch (exception) 
        {
            throw new Meteor.Error('500', exception);
        }
    },
});

rateLimit({
  methods: [
    'teams.insert',
    'teams.update',
    'teams.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
