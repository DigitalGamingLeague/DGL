import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../Documents';

Meteor.publish('documents', function documents() {
    return Documents.find();
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('documents.view', function documentsView(documentId) {
    check(documentId, String);
    return Documents.find({ _id: documentId });
});

publishComposite('documents.news', function documentsNews(labels = ['News'], n = 3) {
    
    check(n, Number);
    check(labels, [String]);
    
    return {
        find: function()
        {
            return Documents.find({ 
                labels: { $in: labels }
            }, 
            {
                limit: n,
                sort: { createdAt: -1 },
            });
        },
        children: [
            {
                find(news) {

                    return Meteor.users.find({
                            _id: news.owner
                        },
                        { 
                            fields: { profile: 1 } 
                    });
                }
            }
        ]
    };
});
    