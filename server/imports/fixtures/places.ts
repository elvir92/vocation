import {Places} from '../../../imports/collections/places';
import {IPlace} from "../../../imports/models/index";


export function loadPlaces() {
  if (Places.find({}).fetch().length == 0) {

        let titles = ['Nearest airport', 'Nearest beach', 'next ferry', 'Nearest train station', 'Next motorway', 'Next bar', 'Next skiing area', 'Next golf course', 'Nearest restaurant'];
        let placeholders = ['airport name', 'beach name', 'ferry name', 'station name', 'motorway name', 'bar name', 'skiing area name', 'golf course name', 'restaurant name',];

        for (let i = 0; i < titles.length; i++) {
            let place: IPlace = {
                placeholder: [{language: 'en', text: placeholders[i]}],
                title: [{language: 'en', text: titles[i]}],
                isActive: true,
                address: 'Trg bana jelacica',
                city:{
                  country: 'Croatia',
                  cityName: 'Zagreb',
                  cityId:22
                },
                numberOfRooms:5,
                parking: true,
                climate: true
            };
            Places.collection.insert(place);
        }
    }
}
