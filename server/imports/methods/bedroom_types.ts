import { BedroomTypes } from 'imports/collections/bedroom_types';
import {Meteor} from 'meteor/meteor';
import { IBedroomType } from 'imports/models/bedroom_type';
// import {check, Match} from 'meteor/check';

Meteor.methods({

    addBedroomType(bedroomType: IBedroomType): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const bedroomTypeExists = !!BedroomTypes.collection.find({'type.text': bedroomType.type[0].text}).count();

        if (bedroomTypeExists) {
            throw new Meteor.Error('Bedroom-type-exists',
                'Bedroom type already exists');
        }

        return BedroomTypes.collection.insert(bedroomType);
    },

    removeBedroomType(bedroomType: IBedroomType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const bedroomTypeExists = !!BedroomTypes.collection.find(bedroomType._id).count();

        if (!bedroomTypeExists) {
            throw new Meteor.Error('Bedroom-type-not-exists',
                'Bedroom type doesn\'t exist');
        }

        BedroomTypes.collection.remove(bedroomType._id);
    },

    updateBedroomType(bedroomType: IBedroomType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        BedroomTypes.collection.update(bedroomType._id, {
            $set: {type: bedroomType.type}
        });
    },
});