import { IReservations } from './../models/reservations';
import {MongoObservable} from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';

export const Reservations = new MongoObservable.Collection<IReservations>('reservations');

function loggedIn() {
    return !!Meteor.user();
}

Reservations.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});
