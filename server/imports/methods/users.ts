import {IProfile} from "../../../imports/models";

Meteor.methods({
    updateProfile(profile:IProfile): void {
        if (!this.userId) throw new Meteor.Error('unauthorized', 'User must be logged-in');
        
        Meteor.users.update(this.userId, {
            $set: { profile }
        });
    },
});
