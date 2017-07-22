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
    });

    try {
      return Teams.insert({ owner: this.userId, ...team });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'teams.update': function teamsUpdate(team) {
    check(team, {
      _id: String,
      name: String,
      abbreviation: String,
      website: String,
    });

    try {
      const teamId = team._id;
      Teams.update(teamId, { $set: team });
      return teamId; // Return _id so we can redirect to teams after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'teams.remove': function teamsRemove(teamId) {
    check(teamId, String);

    try {
      return Teams.remove(teamId);
    } catch (exception) {
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
