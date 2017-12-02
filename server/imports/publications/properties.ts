import {Meteor} from 'meteor/meteor';
import {IProperty} from "../../../imports/models";
import {Properties} from "../../../imports/collections";
import {IMongoOptions} from "../../../imports/models/mongo-options";


Meteor.publish('properties', function (limit?: number, skip?: number): Mongo.Cursor<IProperty> {
    const userId = this.userId;
    if (!userId) {
        return;
    }

    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };

    return options ? Properties.collection.find({userId}, options) : Properties.collection.find({userId});
});
