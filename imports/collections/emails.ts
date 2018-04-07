import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Email } from '../models/email';

export const Emails = new MongoObservable.Collection<Email>('emails');

function loggedIn() {
    return !!Meteor.user();
}

Emails.allow({
    update: loggedIn,
    remove: loggedIn
});