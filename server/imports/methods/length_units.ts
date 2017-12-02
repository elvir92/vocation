import {Meteor} from 'meteor/meteor';
// import {check, Match} from 'meteor/check';
import {ILengthUnit} from "../../../imports/models";
import {LengthUnits} from "../../../imports/collections/length_units";
/*
const nonEmptyString = Match.Where((str) => {
    check(str, String);
    return str.length > 0;
});
*/
Meteor.methods({

    addLengthUnit(lengthUnit: ILengthUnit): string {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        const lengthUnitExists = !!LengthUnits.collection.find({'title.text': lengthUnit.title[0].text}).count();

        if (lengthUnitExists) {
            throw new Meteor.Error('Length-unit-exists',
                'Length unit already exists');
        }

        return LengthUnits.collection.insert(lengthUnit);
    },

    removeLengthUnit(lengthUnit: ILengthUnit): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

//        check(lengthUnit._id, nonEmptyString);

        const lengthUnitExists = !!LengthUnits.collection.find(lengthUnit._id).count();

        if (!lengthUnitExists) {
            throw new Meteor.Error('list-not-exists',
                'Length Unit doesn\'t exist');
        }

        LengthUnits.collection.remove(lengthUnit._id);
    },

    updateLengthUnit(lengthUnit: ILengthUnit): void {
        if (!this.userId) {
            throw new Meteor.Error('unauthorized',
                'User must be logged-in');
        }

        LengthUnits.collection.update(lengthUnit._id, {
            $set: {title: lengthUnit.title}
        });
    },
});