import {Cities} from '../../../imports/collections/cities';
import {City} from "../../../imports/models/city";


export function loadCities() {
    if (Cities.find({}).fetch().length == 0) {
        let cities = ['Zagreb', 'Rijeka', 'Zadar', 'Split', 'Biograd','Dubrovnik','Pula','Murter','Korcula'];
        for (let i = 0; i < cities.length; i++) {
            let city: City = {
                cityName: cities[i],
            };
            Cities.collection.insert(city);
        }
    }
}
