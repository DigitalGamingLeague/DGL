import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


// Create collection

const Teams = new Mongo.Collection('Teams');
export default Teams;

// Prevent client from handling database

Teams.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Teams.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// Create the schema

Teams.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The team name',
  },
  tag: {
    type: String,
    label: 'An abbreviated team name',
  },
  created_at: {
    type: String,
    label: 'Creation time',
  },
  captain_id: {
    type: String,
    label: 'ID of the team leader',
  },
});

Teams.attachSchema(Teams.schema);
