import { Meteor } from 'meteor/meteor';
import { IPropertyType } from "../../../imports/models/index";
import { PropertyTypes } from "../../../imports/collections/index";

Meteor.publish('property-types', function (): Mongo.Cursor<IPropertyType> {
    //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
    if (!this.userId) {
        return;
    }

    return PropertyTypes.collection.find({});
});