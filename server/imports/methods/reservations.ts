import { IReservations } from 'imports/models/reservations';
import {Meteor} from 'meteor/meteor';
import { Reservations } from 'imports/collections/reservations';
// import {check, Match} from 'meteor/check';

Meteor.methods({

    addReservation(reservation: IReservations): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

      const reservationExists = !!Reservations.collection.find({ 'propertyId': reservation.propertyId,
                                                                  'status': reservation.status}).count();

        if (reservationExists) {
            throw new Meteor.Error('Reservation-exists',
                'Reservation already exists');
        }

        return Reservations.collection.insert(reservation);
    },

    removeReservation(reservation: IReservations): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const reservationExists = !!Reservations.collection.find(reservation._id).count();

        if (!reservationExists) {
            throw new Meteor.Error('Reservation-not-exists',
                'Reservation doesn\'t exist');
        }

        Reservations.collection.remove(reservation._id);
    },

    updateReservation(reservation: IReservations): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        Reservations.collection.update(reservation._id, {
            $set: {
              status: reservation.status,
              from: reservation.from,
              to: reservation.to
            }
        });
    },
});