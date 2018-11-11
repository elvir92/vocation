import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { publishComposite } from 'meteor/reywood:publish-composite';

import {IProperty} from "../../../imports/models";
import {Properties} from "../../../imports/collections";
import {Pictures} from "../../../imports/collections/pictures";
import {IMongoOptions} from "../../../imports/models/mongo-options";
import {IPicture} from "../../../imports/models/picture";


Meteor.publish('backend-properties', function (limit?: number, skip?: number) {
    const userId = this.userId;
    if (!userId) {
        return;
    }

    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };

    return options ? Properties.collection.find({userId}, options) : Properties.collection.find({userId});
});

publishComposite('properties', function (limit?: number, skip?: number){
    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };

    return {
        find: () => {
            return options ? Properties.collection.find({isActive: true}, options) : Properties.collection.find({isActive: true});
        },
        children: [
            <PublishCompositeConfig1<IProperty, IPicture>> {
                find: (property) => {
                    return Pictures.collection.find({_id: {$in: property.images}, isActive: true});
                }
            }
        ]
    };
});

Meteor.publish('all-properties', function () {
    return Properties.collection.find({});
});

