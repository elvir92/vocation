import {Meteor} from 'meteor/meteor';
import {IPicture} from "../../../imports/models";
import {Pictures} from "../../../imports/collections";


Meteor.publish('pictures-by-ids', function (ids: string[]): Mongo.Cursor<IPicture> {
    const userId = this.userId;
    if (!userId) {
        return;
    }
    //check ids
    if (!ids) {
        ids = [];
    }
    return Pictures.collection.find({userId, _id: {$in: ids}, isActive: true});
});

Meteor.publish('pictures', function (): Mongo.Cursor<IPicture> {
    const userId = this.userId;
    if (!userId) {
        return;
    }

    return Pictures.collection.find({userId, isActive: true});
});
