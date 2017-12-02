import {Meteor} from 'meteor/meteor';
import {ILengthUnit} from "../../../imports/models/index";
import {LengthUnits} from "../../../imports/collections/index";

Meteor.publish('length-units', function (): Mongo.Cursor<ILengthUnit> {
    //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
    if (!this.userId) {
        return;
    }

    return LengthUnits.collection.find({});
});