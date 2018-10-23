import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {IPlace} from "../../../imports/models";
import {Places} from "../../../imports/collections";


Meteor.publish('places', function (){
    return Places.collection.find({});
});
