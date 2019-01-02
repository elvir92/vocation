import { publishComposite } from 'meteor/reywood:publish-composite';


import {IList, IListGroup, IMongoOptions} from "../../../imports/models";
import {Lists, ListsGroups} from "../../../imports/collections";

publishComposite('listing', function (limit?: number, skip?: number) {
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
            {
                find: (listGroup) => {
                    return Lists.collection.find({parentId: listGroup._id, isActive: true});
                }
            }
        ]
    };
});

publishComposite('listing-by-group', function (groupId: string) {
    //console.log("publish listing-by-group");
    if (!this.userId) {
        return;
    }
    return {
        find: () => {
            return ListsGroups.collection.find({_id: groupId});
        },
        children: [
            {
                find: (listGroup) => {
                    return Lists.collection.find({parentId: listGroup._id, isActive: true});
                }
            }
        ]
    };
});
