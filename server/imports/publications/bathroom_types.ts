import { BathroomTypes } from './../../../imports/collections/bathroom_types';
import { IBathroomType } from './../../../imports/models/bathroom_type';
import { Meteor } from 'meteor/meteor';

Meteor.publish('bathroom-types', function (): Mongo.Cursor<IBathroomType> {
  //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
  if (!this.userId) {
    return;
  }

  return BathroomTypes.collection.find({});
});