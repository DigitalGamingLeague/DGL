import { Meteor } from 'meteor/meteor';

//if (Meteor.isDevelopment) process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
process.env.MAIL_URL = "smtps://postmaster%40mg.playbcl.org:playbcl@smtp.mailgun.org:587";