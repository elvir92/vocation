import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {IMongoOptions, IList} from "../../../imports/models";
import {Lists} from "../../../imports/collections";


Meteor.publish('lists', function (limit?: number, skip?: number){
    if (!this.userId) {
        return;
    }
    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };
    let list = options ? Lists.collection.find({}, options) : Lists.collection.find({});
    return list;
});