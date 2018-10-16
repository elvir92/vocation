import {MongoObservable} from 'meteor-rxjs';
import {IAddress} from '../models/address';
import {Meteor} from 'meteor/meteor';

export const Addresses = new MongoObservable.Collection<IAddress>('addresses');

function loggedIn() {
    return !!Meteor.user();
}

Addresses.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});
