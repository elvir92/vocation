import { BathroomTypes } from './../../../imports/collections/bathroom_types';
import { IBathroomType } from './../../../imports/models/bathroom_type';
import {Meteor} from 'meteor/meteor';
// import {check, Match} from 'meteor/check';

Meteor.methods({

    addBathroomType(bathroomType: IBathroomType): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const bathroomTypeExists = !!BathroomTypes.collection.find({'type.text': bathroomType.type[0].text}).count();

        if (bathroomTypeExists) {
            throw new Meteor.Error('Bedroom-type-exists',
                'Bedroom type already exists');
        }

        return BathroomTypes.collection.insert(bathroomType);
    },

    removeBathroomType(bathroomType: IBathroomType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const bathroomTypeExists = !!BathroomTypes.collection.find(bathroomType._id).count();

        if (!bathroomTypeExists) {
            throw new Meteor.Error('Bedroom-type-not-exists',
                'Bedroom type doesn\'t exist');
        }

        BathroomTypes.collection.remove(bathroomType._id);
    },

    updateBathroomType(bathroomType: IBathroomType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        BathroomTypes.collection.update(bathroomType._id, {
            $set: {type: bathroomType.type}
        });
    },
});