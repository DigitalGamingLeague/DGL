import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../../Documents/Documents';

Meteor.publishComposite('dashboard.summary', function () {
    
    var n = 5;
    
    if (Roles.userIsInRole(Meteor.userId(), ['staff'])) 
    {
        return [
            {
                find: function()
                {
                    return Documents.find({}, 
                    {
                        limit: n,
                        sort: { createdAt: -1 },
                    });
                },
                children: [
                    {
                        find(doc) {

                            return Meteor.users.find({
                                    _id: doc.owner
                                },
                                { 
                                    fields: { profile: 1 } 
                                });
                        }
                    }
                ]
            },
            {
                find: function()
                {
                    return Meteor.users.find({}, 
                    {
                        limit: n,
                        sort: { createdAt: -1 },
                        fields: 
                        { 
                            'status': 1,
                            'createdAt': 1,
                            'profile': 1,
                            'team': 1,
                            'emails': 1,
                            'roles': 1
                        } 
                    });
                }
            }
        ];
    }
});
    