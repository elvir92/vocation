import {LengthUnits} from '../../../imports/collections/length_units';
import {ILengthUnit} from "../../../imports/models/index";


export function loadLengthUnits() {
    if (LengthUnits.find({}).fetch().length == 0) {

        let units = ['Kilometer', 'Meter'];

        for (let i = 0; i < units.length; i++) {
            let unt: ILengthUnit = {
                title: [{language: 'en', text: units[i]}],
                isActive: true
            };
            LengthUnits.collection.insert(unt);
        }
    }
}