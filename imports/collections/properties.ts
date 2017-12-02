import {MongoObservable} from 'meteor-rxjs';
import {IProperty} from '../models/index';
import {Meteor} from 'meteor/meteor';

export const Properties = new MongoObservable.Collection<IProperty>('properties');

function loggedIn() {
    return !!Meteor.user();
}

Properties.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});