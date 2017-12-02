import {MongoObservable} from 'meteor-rxjs';
import {ILengthUnit} from '../models/length_unit';
import {Meteor} from 'meteor/meteor';

export const LengthUnits = new MongoObservable.Collection<ILengthUnit>('lengthunits');

function loggedIn() {
    return !!Meteor.user();
}

LengthUnits.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});