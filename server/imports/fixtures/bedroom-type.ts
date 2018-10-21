import { BedroomTypes } from '../../../imports/collections/bedroom_types';
import { IBedroomType } from 'imports/models/bedroom_type';


export function loadBedroomTypes() {
    if (BedroomTypes.find({}).fetch().length == 0) {

        let types = ['Kids', 'Master', 'Teen'];

        for (let i = 0; i < types.length; i++) {
          let typ: IBedroomType = {
                type: [{ language: 'en', text: types[i] }],
                isActive: true
            };
          BedroomTypes.collection.insert(typ);
        }
    }
}