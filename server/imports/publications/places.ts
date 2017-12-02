import {Meteor} from 'meteor/meteor';
import {IPlace} from "../../../imports/models";
import {Places} from "../../../imports/collections";


Meteor.publish('places', function (): Mongo.Cursor<IPlace> {
    if (!this.userId) {
        return;
    }
    return Places.collection.find({});
});
