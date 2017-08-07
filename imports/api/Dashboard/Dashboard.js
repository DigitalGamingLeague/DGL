/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Documents = new Mongo.Collection('Documents');

Documents.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Documents.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Documents.schema = new SimpleSchema({
    owner: {
        type: String,
        label: 'The ID of the user this document belongs to.',
    },
    createdAt: {
        type: String,
        label: 'The date this document was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
        },
    },
    updatedAt: {
        type: String,
        label: 'The date this document was last updated.',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
    },
    title: {
        type: String,
        label: 'The title of the document.',
    },
    body: {
        type: String,
        label: 'The body of the document.',
    },
    labels: {
        type: Array,
        label: 'The labels for the document.',
    },
    "labels.$": {
        type: String
    },
});

Documents.attachSchema(Documents.schema);

export default Documents;
