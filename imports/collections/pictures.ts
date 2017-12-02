import {MongoObservable} from 'meteor-rxjs';
import {IPicture} from '../models/index';
import {Meteor} from 'meteor/meteor';

export const Pictures = new MongoObservable.Collection<IPicture>('pictures');

function loggedIn() {
    return !!Meteor.user();
}

Pictures.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});