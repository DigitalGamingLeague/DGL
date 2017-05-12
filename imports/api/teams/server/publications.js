import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from '../teams';

Meteor.publish('teams.list', () => Teams.find());

Meteor.publish('teams.view', (_id) => {
  check(_id, String);
  return Teams.find(_id);
});
