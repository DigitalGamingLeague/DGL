import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Matches from '../documents';

Meteor.publish('matches.list', () => Matches.find());

Meteor.publish('matches.view', (_id) => {
  check(_id, String);
  return Matches.find(_id);
});
