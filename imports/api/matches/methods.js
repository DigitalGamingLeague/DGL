import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Matches from './Matches';
import rateLimit from '../../modules/rate-limit.js';

export const upsertMatch = new ValidatedMethod({
    name: 'Matches.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        title: { type: String, optional: true },
        body: { type: String, optional: true },
    }).validator(),
    run(match) {
        return Matches.upsert({ _id: match._id }, { $set: match });
    },
});

export const removeMatch = new ValidatedMethod({
    name: 'Matches.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Matches.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertMatch,
        removeMatch,
    ],
    limit: 5,
    timeRange: 1000,
});
