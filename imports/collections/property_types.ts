import { MongoObservable } from 'meteor-rxjs';
import { IPropertyType } from '../models/property_type';
import { Meteor } from 'meteor/meteor';

export const PropertyTypes = new MongoObservable.Collection<IPropertyType>('propertytypes');

function loggedIn() {
    return !!Meteor.user();
}

PropertyTypes.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});