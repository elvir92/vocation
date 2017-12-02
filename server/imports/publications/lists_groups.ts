import {Meteor} from 'meteor/meteor';
import {IMongoOptions, IListGroup} from "../../../imports/models";
import {ListsGroups} from "../../../imports/collections";

Meteor.publish('lists-groups', function (limit?: number, skip?: number): Mongo.Cursor<IListGroup> {

    //if (!this.userId || !("role" in Meteor.user() && Meteor.user().role == "admin" )) {
    if (!this.userId) {
        return;
    }
    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };
    let list = options ? ListsGroups.collection.find({}, options) : ListsGroups.collection.find({});
    console.log(list.fetch());
    return list;
});