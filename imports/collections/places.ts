import {MongoObservable} from 'meteor-rxjs';
import {IPlace} from '../models/index';
import {Meteor} from 'meteor/meteor';

export const Places = new MongoObservable.Collection<IPlace>('places');

function loggedIn() {
    return !!Meteor.user();
}

Places.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});