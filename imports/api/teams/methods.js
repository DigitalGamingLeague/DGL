import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Teams from './teams';
import rateLimit from '../../modules/rate-limit.js';

export const upsertTeam = new ValidatedMethod({
    name: 'Teams.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        created_at: { type: String, optional: true },
        captain_id: { type: String, optional: true },
        name: { type: String, optional: true },
        tag: { type: String, optional: true }
    }).validator(),
    run(team) {
        return Teams.upsert({ _id: team._id }, { $set: team });
    },
});

export const removeTeam = new ValidatedMethod({
    name: 'Teams.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Teams.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertTeam,
        removeTeam,
    ],
    limit: 5,
    timeRange: 1000,
});
