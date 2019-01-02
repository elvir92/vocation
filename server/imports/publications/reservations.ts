import { Reservations } from './../../../imports/collections/reservations';
import { IReservations } from 'imports/models/reservations';
import { Meteor } from 'meteor/meteor';

Meteor.publish('reservations', function (): Mongo.Cursor<IReservations> {
  //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
  if (!this.userId) {
    return;
  }

  return Reservations.collection.find({});
});

Meteor.publish('search-component-reservations', function (): Mongo.Cursor<IReservations> {
  return Reservations.collection.find({ 'status': { $in: ["Reserved", "Hold"] } });
});