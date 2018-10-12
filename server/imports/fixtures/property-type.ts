import { PropertyTypes } from '../../../imports/collections/property_types';
import { IPropertyType } from "../../../imports/models/index";


export function loadPropertyTypes() {
    if (PropertyTypes.find({}).fetch().length == 0) {

        let types = ['Apartment', 'Studio', 'Duplex', 'Triplex'];

        for (let i = 0; i < types.length; i++) {
            let typ: IPropertyType = {
                type: [{ language: 'en', text: types[i] }],
                isActive: true
            };
            PropertyTypes.collection.insert(typ);
        }
    }
}