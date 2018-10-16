import {Meteor} from 'meteor/meteor';
import {IAddress} from "../../../imports/models";
import {Addresses} from "../../../imports/collections/addresses";

Meteor.methods({

    addAddress(address: IAddress): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const addressExists = !!Addresses.collection.find({'city': address.city}).count();

        if (addressExists) {
            throw new Meteor.Error('List-exists',
                'Address already exists');
        }

        return Addresses.collection.insert(address);
    },

    removeAddress(address:IAddress): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(place._id, nonEmptyString);

        const addressExists = !!Addresses.collection.find(address._id).count();

        if (!addressExists) {
            throw new Meteor.Error('list-not-exists',
                'Address doesn\'t exist');
        }

        Addresses.collection.remove(address._id);
    },

    updateAddress(address: IAddress): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        Addresses.collection.update(address._id, {
            $set: {
                city: address.city,
                country: address.country,
                cityShort: address.cityShort,
                countryShort: address.countryShort
            }
        });
    },
});
