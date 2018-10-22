import { IBathroomType } from './../models/bathroom_type';
import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

export const BathroomTypes = new MongoObservable.Collection<IBathroomType>('bathroomtypes');

function loggedIn() {
  return !!Meteor.user();
}

BathroomTypes.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});