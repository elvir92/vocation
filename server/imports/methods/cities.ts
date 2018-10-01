import {Meteor} from 'meteor/meteor';
import {City} from "../../../imports/models";
import {Cities} from "../../../imports/collections/cities";

Meteor.methods({

    addCity(city: City): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const cityExists = !!Cities.collection.find({'cityName': city.cityName}).count();

        if (cityExists) {
            throw new Meteor.Error('List-exists',
                'City already exists');
        }

        return Cities.collection.insert(city);
    },

    removeCity(city: City): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(place._id, nonEmptyString);

        const cityExists = !!Cities.collection.find(city._id).count();

        if (!cityExists) {
            throw new Meteor.Error('list-not-exists',
                'Place doesn\'t exist');
        }

        Cities.collection.remove(city._id);
    },

    updateCity(city: City): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        Cities.collection.update(city._id, {
            $set: {cityName: city.cityName}
        });
    },
});
