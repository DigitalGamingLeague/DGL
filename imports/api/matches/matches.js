import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Matches = new Mongo.Collection('Matches');
export default Matches;

Matches.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Matches.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Matches.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
});

Matches.attachSchema(Matches.schema);
