import { Addresses } from '../../../imports/collections/addresses';
import { IAddress } from "../../../imports/models/address";


export function loadAddresses() {
    if (Addresses.find({}).fetch().length == 0) {
        let croCities = ['Zagreb', 'Rijeka', 'Zadar', 'Split', 'Biograd', 'Dubrovnik', 'Pula', 'Murter', 'Korcula'];
        let bhCities = ['Bihac', 'Tuzla', 'Sarajevo', 'Mostar'];

        croCities.forEach(element => {
            let address: IAddress = {
                city: element,
                country: 'Croatia',
                countryShort: 'HR',
            }
            Addresses.collection.insert(address);
        });

        bhCities.forEach(element => {
            let address: IAddress = {
                city: element,
                country: 'Bosna i Hercegovina',
                countryShort: 'BIH',
            }
            Addresses.collection.insert(address);
        });
    }
}
