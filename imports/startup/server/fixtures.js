import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Documents from '../../api/Documents/Documents';

var roles = [
    'super', 
    'admin', 
    'staff', 
    'moderator',
    'captain', 
    'player',
    'member',
];

var users = [
    { 
        username: "admin", 
        email: "admin@admin.com", 
        roles: ['super', 'admin', 'staff', 'member'] 
    },
    { 
        username: "dummy", 
        email: "dummy@dummy.com", 
        roles: ['member'] 
    },
];

/* Populate the user list */
function populateUsers()
{
    if (Meteor.users.find().count() === 0)
    {
        /* Create roles from array */   
        _.each(roles, function (role) {
            Roles.createRole(role, {unlessExists: true});
        });

        /* Create user accounts from array */
        _.each(users, function (user) {
            var id;

            id = Accounts.createUser({
                email: user.email,
                password: user.username,
                profile: { username: user.username }
            });

            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }

        });
        
    }
}

populateUsers();