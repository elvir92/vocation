import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { IEmail } from '../models/email';

export const Emails = new MongoObservable.Collection<IEmail>('emails');

function loggedIn() {
    return !!Meteor.user();
}

Emails.allow({
    update: loggedIn,
    remove: loggedIn
});