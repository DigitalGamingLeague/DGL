import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Documents = new Mongo.Collection('Documents');
export default Documents;

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
    title: 
    {
        type: String,
        label: 'Title of the document.',
    },
    
    body: 
    {
        type: String,
        label: 'Body of the document.',
    },
    
    author: 
    {
        type: String,
        label: 'Author of the document.',
    },
    
    /*  tags: Array,
    
    'tags.$': String,
    
    created: 
    {
        type: Date,
        label: "Date the document was created",
        autoValue: function() 
        {
            if ( this.isInsert ) 
            {
                return new Date;
            } 
        }
    },
    
    updated: 
    {
        type: Date,
        label: "Date the document was updated",
        autoValue: function() 
        {
            if ( this.isUpdate ) 
            {
                return new Date;
            } 
        }
    }*/
});

Documents.attachSchema(Documents.schema);

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
