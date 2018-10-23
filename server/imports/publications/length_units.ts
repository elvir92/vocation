import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {ILengthUnit} from "../../../imports/models/index";
import {LengthUnits} from "../../../imports/collections/index";

Meteor.publish('length-units', function () {
    //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
    if (!this.userId) {
        return;
    }

    return LengthUnits.collection.find({});
});