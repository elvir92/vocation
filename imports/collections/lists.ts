import {MongoObservable} from 'meteor-rxjs';
import {IList} from '../models/index';
import {Meteor} from 'meteor/meteor';

export const Lists = new MongoObservable.Collection<IList>('lists');

function loggedIn() {
    return !!Meteor.user();
}

Lists.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});