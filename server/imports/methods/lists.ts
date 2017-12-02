import {Meteor} from 'meteor/meteor';
//import {check, Match} from 'meteor/check';
import {IList} from "../../../imports/models";
import {Lists} from "../../../imports/collections/lists";

/*
const nonEmptyString = Match.Where((str) => {
    check(str, String);
    return str.length > 0;
});

 */
Meteor.methods({

    addListItem(list: IList): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const listExists = !!Lists.collection.find({'title.text': list.title[0].text}).count();

        if (listExists) {
            throw new Meteor.Error('List-exists',
                'Lists already exists');
        }

        return Lists.collection.insert(list);
    },

    removeListItem(list: IList): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(list._id, nonEmptyString);

        const listExists = !!Lists.collection.find(list._id).count();

        if (!listExists) {
            throw new Meteor.Error('list-not-exists',
                'List Group doesn\'t exist');
        }

        Lists.collection.remove(list._id);
    },

    updateListItem(list: IList): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        Lists.collection.update(list._id, {
            $set: {title: list.title}
        });
    },
});