import {Meteor} from 'meteor/meteor';
import {IMongoOptions, IList} from "../../../imports/models";
import {Lists} from "../../../imports/collections";


Meteor.publish('lists', function (limit?: number, skip?: number): Mongo.Cursor<IList> {
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

/*
Meteor.publishComposite('lists', function (): PublishCompositeConfig<IList> {
    console.log("publish Lists . . . " + this.userId);
    if (!this.userId) {
        return;
    }

    return {
        find: () => {
            return Lists.collection.find({});
        },
    };
});
*/
