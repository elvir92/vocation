import {Meteor} from 'meteor/meteor';
import {IAddress} from "../../../imports/models/address";
import {Addresses} from "../../../imports/collections/addresses";


Meteor.publish('addresses', function (): Mongo.Cursor<IAddress> {
    return Addresses.collection.find({});
});
