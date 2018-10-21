import { Meteor } from 'meteor/meteor';
import { IBedroomType } from 'imports/models/bedroom_type';
import { BedroomTypes } from 'imports/collections/bedroom_types';

Meteor.publish('bedroom-types', function (): Mongo.Cursor<IBedroomType> {
  //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
  if (!this.userId) {
    return;
  }

  return BedroomTypes.collection.find({});
});