import { IBathroomType } from './../../../imports/models/bathroom_type';
import { BathroomTypes } from './../../../imports/collections/bathroom_types';


export function loadBathroomTypes() {
  if (BathroomTypes.find({}).fetch().length == 0) {

    let types = ['Small master', 'Master', 'Half'];

    for (let i = 0; i < types.length; i++) {
      let typ: IBathroomType = {
        type: [{ language: 'en', text: types[i] }],
        isActive: true
      };
      BathroomTypes.collection.insert(typ);
    }
  }
}