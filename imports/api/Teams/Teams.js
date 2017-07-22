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
    },
    
    abbreviation: {
        type: String,
        label: 'The abbreviation of the team.',
    },
    
    website: {
        type: String,
        label: 'The website for the team.',
    },
});

Teams.attachSchema(Teams.schema);

export default Teams;
