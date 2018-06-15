import {Meteor} from 'meteor/meteor';
import {City} from "../../../imports/models/city";
import {Cities} from "../../../imports/collections/cities";


Meteor.publish('cities', function (): Mongo.Cursor<City> {
    return Cities.collection.find({});
});
