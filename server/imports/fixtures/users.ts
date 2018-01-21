import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';


export function loadAdminUser() {
    console.log(Meteor.users.findOne({"profile.type": 0}))
    if (Meteor.users.find({"profile.type": 0}).fetch().length == 0) {
        Accounts.createUser({
            email: 'admin@gmail.com',
            password: 'admin-11-',
            profile: {
                type: 0
            }
        });
    }
}