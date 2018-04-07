import {Meteor} from 'meteor/meteor';
import {IEmail} from "../../../imports/models";
import {Emails} from "../../../imports/collections";


Meteor.publish('emails', function (): Mongo.Cursor<IEmail> {
    if (!this.userId) {
        return;
    }
    return Emails.collection.find({});
});