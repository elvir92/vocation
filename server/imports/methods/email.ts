import { Meteor } from 'meteor/meteor';

import { Emails } from '../../../imports/collections/emails';

Meteor.methods({
  addEmail(email: string) {
    return Emails.insert({
      email
    });
  },

});
