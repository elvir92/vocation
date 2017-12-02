import {Meteor} from 'meteor/meteor';
import {IList, IListGroup, IMongoOptions} from "../../../imports/models";
import {Lists, ListsGroups} from "../../../imports/collections";

Meteor.publishComposite('listing', function (limit?: number, skip?: number): PublishCompositeConfig<IListGroup> {
    if (!this.userId) {
        return;
    }

    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };
    //console.log(options);

    return {
        find: () => {
            return options ? ListsGroups.collection.find({}, options) : ListsGroups.collection.find({});
        },
        children: [
            <PublishCompositeConfig1<IListGroup, IList>> {
                find: (listGroup) => {
                    return Lists.collection.find({parentId: listGroup._id, isActive: true});
                }
            }
        ]
    };
});

Meteor.publishComposite('listing-by-group', function (groupId: string): PublishCompositeConfig<IListGroup> {
    //console.log("publish listing-by-group");
    if (!this.userId) {
        return;
    }
    return {
        find: () => {
            return ListsGroups.collection.find({_id: groupId});
        },
        children: [
            <PublishCompositeConfig1<IListGroup, IList>> {
                find: (listGroup) => {
                    return Lists.collection.find({parentId: listGroup._id, isActive: true});
                }
            }
        ]
    };
});
