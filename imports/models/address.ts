import {IText} from "./text";

export interface IAddress {
    _id?: string;
    city: string;
    cityShort?:string;
    country: string;
    countryShort?: string;
}
