import {Cities} from '../../../imports/collections/cities';
import {City} from "../../../imports/models/city";


export function loadCities() {
    if (Cities.find({}).fetch().length == 0) {
        let croCities = ['Zagreb', 'Rijeka', 'Zadar', 'Split', 'Biograd','Dubrovnik','Pula','Murter','Korcula'];
        let bhCities = ['Bihac', 'Tuzla', 'Sarajevo', 'Mostar'];

        croCities.forEach(element => {
            let city: City = {
                cityName: element,
                country: 'Croatia'
            }
            Cities.collection.insert(city);
        });

        bhCities.forEach(element => {
            let city: City = {
                cityName: element,
                country: 'Bosna i Hercegovina'
            }
            Cities.collection.insert(city);
        });
    }
}
