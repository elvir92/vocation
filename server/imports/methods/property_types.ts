import {Meteor} from 'meteor/meteor';
// import {check, Match} from 'meteor/check';
import {IPropertyType} from "../../../imports/models";
import {PropertyTypes} from "../../../imports/collections/property_types";

Meteor.methods({

    addPropertyType(propertyType: IPropertyType): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const propertyTypeExists = !!PropertyTypes.collection.find({'type.text': propertyType.type[0].text}).count();

        if (propertyTypeExists) {
            throw new Meteor.Error('Property-type-exists',
                'Proeprty type already exists');
        }

        return PropertyTypes.collection.insert(propertyType);
    },

    removePropertyType(propertyType: IPropertyType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const propertyTypeExists = !!PropertyTypes.collection.find(propertyType._id).count();

        if (!propertyTypeExists) {
            throw new Meteor.Error('property-type-not-exists',
                'Proeprty type doesn\'t exist');
        }

        PropertyTypes.collection.remove(propertyType._id);
    },

    updatePropertyType(propertyType: IPropertyType): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        PropertyTypes.collection.update(propertyType._id, {
            $set: {type: propertyType.type}
        });
    },
});