import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

import { IMongoOptions } from "../../../imports/models";
import { Properties, Pictures, PropertyTypes, Reservations } from "../../../imports/collections";


Meteor.publish('backend-properties', function (limit?: number, skip?: number) {
    const userId = this.userId;
    if (!userId) {
        return;
    }

    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };

    return options ? Properties.collection.find({ userId }, options) : Properties.collection.find({ userId });
});

publishComposite('frontend-properties', function () {
    return {
        find: () => {
            return Properties.collection.find({ isActive: true });
        },
        children: [
            {
                find: function (property) {
                    return Pictures.collection.find({ _id: { $in: property.images }, isActive: true });
                }
            },
            {
                find: function (property) {
                    return Reservations.collection.find({ propertyId: property._id, status: { $in: ['Hold', 'Reserved'] } });
                }
            },
            // {
            //     find: function (property) {
            //         return PropertyTypes.collection.find({ _id: property.propertyTypeId });
            //     }
            // },
        ]
    };
});


publishComposite('properties', function (limit?: number, skip?: number) {
    let options: IMongoOptions = {
        skip: skip,
        limit: limit,
    };

    return {
        find: () => {
            return options ? Properties.collection.find({ isActive: true }, options) : Properties.collection.find({ isActive: true });
        },
        children: [
            {
                find: (property) => {
                    return Pictures.collection.find({ _id: { $in: property.images }, isActive: true });
                }
            }
        ]
    };
});

Meteor.publish('all-properties', function () {
    return Properties.collection.find({});
});

