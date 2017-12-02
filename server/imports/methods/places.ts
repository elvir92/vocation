import {Meteor} from 'meteor/meteor';
import {IPlace} from "../../../imports/models";
import {Places} from "../../../imports/collections/places";

Meteor.methods({

    addLPlace(list: IPlace): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const placeExists = !!Places.collection.find({'title.text': list.title[0].text}).count();

        if (placeExists) {
            throw new Meteor.Error('List-exists',
                'Place already exists');
        }

        return Places.collection.insert(list);
    },

    removePlace(place: IPlace): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(place._id, nonEmptyString);

        const placeExists = !!Places.collection.find(place._id).count();

        if (!placeExists) {
            throw new Meteor.Error('list-not-exists',
                'Place doesn\'t exist');
        }

        Places.collection.remove(place._id);
    },

    updatePlace(place: IPlace): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        Places.collection.update(place._id, {
            $set: {title: place.title, placeholder: place.placeholder}
        });
    },
});