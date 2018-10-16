import {IProperty} from "../../../imports/models";
import {Properties} from "../../../imports/collections/properties";
import { BoundDirectivePropertyAst } from '@angular/compiler';


Meteor.methods({

    getPropertyById(_id: string): IProperty {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }
        const property = Properties.collection.findOne({_id});
        //check access
        if (property.userId == this.userId) {
            return property;
        }
        throw new Meteor.Error('access',
            'Access is denied');
    },

    insertProperty(property: IProperty): string {
        //console.log("called addProperty method");

        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }
        if (!property.userId) {
            property.userId = Meteor.userId();
        }
        property.insertedAt = new Date();
        property.updatedAt = new Date();
        return Properties.collection.insert(property);
    },

    updateProperty(property: IProperty): string {
        //console.log("called updateProperty method");

        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }
        property.updatedAt = new Date();
        Properties.collection.update(property._id, {
            $set: {
                geLocation: property.geoLocation,
                addressId: property.addressId,
                name: property.name,
                headline: property.headline,
                summary: property.summary,
                description: property.description,
                activities: property.activities,
                images: property.images,
                places: property.places,
                updatedAt: property.updatedAt,
                isActive: property.isActive,
                isEditMode: property.isEditMode
            }
        });
        return property._id;
    },

    removeProperty(property: IProperty): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        //check(property._id, nonEmptyString);

        const propertyExists = !!Properties.collection.find(property._id).count();

        if (!propertyExists) {
            throw new Meteor.Error('property-not-exists',
                'Property doesn\'t exist');
        }

        Properties.collection.remove(property._id);
    },

    countProperties(): number {
        //console.log("countMessages server . . . ");
        let count = Properties.collection.find({userId: this.userId}).count();
        return count;
    }

});