import {MongoObservable} from 'meteor-rxjs';
import {City} from '../models/city';
import {Meteor} from 'meteor/meteor';

export const Cities = new MongoObservable.Collection<City>('cities');

function loggedIn() {
    return !!Meteor.user();
}

Cities.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});
