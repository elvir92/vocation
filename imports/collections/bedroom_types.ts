import { MongoObservable } from 'meteor-rxjs';
import { IBedroomType } from '../models/bedroom_type';
import { Meteor } from 'meteor/meteor';

export const BedroomTypes = new MongoObservable.Collection<IBedroomType>('bedroomtypes');

function loggedIn() {
    return !!Meteor.user();
}

BedroomTypes.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});