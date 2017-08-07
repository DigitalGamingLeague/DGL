/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Teams = new Mongo.Collection('Teams');

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

Teams.schema = new SimpleSchema({
    
    owner: {
        type: String,
        label: 'The ID of the user this team belongs to.',
        unique: true,
    },
    
    createdAt: {
        type: String,
        label: 'The date this team was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
        },
    },
    
    updatedAt: {
        type: String,
        label: 'The date this team was last updated.',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
    },
    
    name: {
        type: String,
        label: 'The name of the team.',
        unique: true,
    },
    
    abbreviation: {
        type: String,
        label: 'The abbreviation of the team.',
    },
    
    description: {
        type: String,
        label: 'The description of the team.',
    },
    
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: 'The website for the team.',
        optional: true,
    },
    
    members: {
        type: Array,
        label: 'The members of the team.',
        optional: true,
    },
    "members.$": {
        type: String
    },
});

Teams.attachSchema(Teams.schema);

export default Teams;
