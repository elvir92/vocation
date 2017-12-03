import {Meteor} from 'meteor/meteor';
import {IProperty} from "../../../imports/models";
import {Properties} from "../../../imports/collections";
import {Pictures} from "../../../imports/collections/pictures";
import {IMongoOptions} from "../../../imports/models/mongo-options";
import {IPicture} from "../../../imports/models/picture";


Meteor.publish('backend-properties', function (limit?: number, skip?: number): Mongo.Cursor<IProperty> {
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

Meteor.publishComposite('properties', function (limit?: number, skip?: number): PublishCompositeConfig<IProperty> {
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

