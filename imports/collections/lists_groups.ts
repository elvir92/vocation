import {MongoObservable} from 'meteor-rxjs';
import {IListGroup} from '../models/index';
import {Meteor} from 'meteor/meteor';

export const ListsGroups = new MongoObservable.Collection<IListGroup>('listsgroups');


function loggedIn() {
    return !!Meteor.user();
}

ListsGroups.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});