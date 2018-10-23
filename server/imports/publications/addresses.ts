import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {IAddress} from "../../../imports/models/address";
import {Addresses} from "../../../imports/collections/addresses";


Meteor.publish('addresses', function (){
    return Addresses.collection.find({});
});
