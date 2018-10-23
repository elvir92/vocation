import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {IEmail} from "../../../imports/models";
import {Emails} from "../../../imports/collections";


Meteor.publish('emails', function () {
    if (!this.userId) {
        return;
    }
    return Emails.collection.find({});
});