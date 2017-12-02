import {Meteor} from 'meteor/meteor';
import {IPicture} from "../../../imports/models";
import {Pictures} from "../../../imports/collections/pictures";


Meteor.methods({

    addPicture(picture: IPicture): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        return Pictures.collection.insert(picture);
    },

    setInActivePicture(picture: IPicture): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(picture._id, nonEmptyString);

        Pictures.collection.update(picture._id, {
            $set: {isActive: false}
        });
        //Pictures.collection.remove(picture._id);
    },

    removePicture(picture: IPicture): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(picture._id, nonEmptyString);
        Pictures.collection.remove(picture._id);
    },

});