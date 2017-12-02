import {Meteor} from 'meteor/meteor';
//import {check, Match} from 'meteor/check';
import {IListGroup} from "../../../imports/models";
import {ListsGroups} from "../../../imports/collections/lists_groups";

/*
const nonEmptyString = Match.Where((str) => {
    check(str, String);
    return str.length > 0;
});
*/
Meteor.methods({

    addListGroups(listGroup: IListGroup): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        /*if (Meteor.user().role != "admin") {
            throw new Meteor.Error('illegal-receiver',
                'Only admin can do this');
        }*/

        const listGroupExists = !!ListsGroups.collection.find({'title.text': listGroup.title}).count();

        if (listGroupExists) {
            throw new Meteor.Error('List Group-exists',
                'List group already exists');
        }

        return ListsGroups.collection.insert(listGroup);
    },

    removeListGroups(listGroup: IListGroup): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }
        /*
                if (Meteor.user().role != "admin") {
                    throw new Meteor.Error('illegal-receiver',
                        'Only admin can do this');
                }
        */
        //check(listGroup._id, nonEmptyString);

        const listGroupExists = !!ListsGroups.collection.find(listGroup._id).count();

        if (!listGroupExists) {
            throw new Meteor.Error('list-group-not-exists',
                'List Group doesn\'t exist');
        }

        ListsGroups.collection.remove(listGroup._id);
    },

    updateListGroups(listGroup: IListGroup): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        ListsGroups.collection.update(listGroup._id, {
            $set: {title: listGroup.title}
        });
    },

    /*
        addMessage(type: MessageType, chatId: string, content: string) {
            if (!this.userId) throw new Meteor.Error('unauthorized',
                'User must be logged-in to create a new chat');

            check(type, Match.OneOf(String, [MessageType.TEXT]));
            check(chatId, nonEmptyString);
            check(content, nonEmptyString);

            const chatExists = !!Chats.collection.find(chatId).count();

            if (!chatExists) {
                throw new Meteor.Error('chat-not-exists',
                    'Chat doesn\'t exist');
            }

            return {
                messageId: Messages.collection.insert({
                    chatId: chatId,
                    senderId: this.userId,
                    content: content,
                    createdAt: new Date(),
                    type: type
                })
            };
        },
    */
    countMessages(): number {
        //console.log("countMessages server . . . ");
        let count = ListsGroups.collection.find({}).count();
        return count;
    }
});