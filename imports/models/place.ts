import {IText} from "./text";

export interface IPlace {
    _id?: string;
    title: IText [];
    placeholder: IText [];
    isActive: boolean;
    address: string;
    city:{
      country: string;
      cityName:string;
      cityId:number;
    };
    numberOfRooms:number;
    parking: boolean;
    climate: boolean;    
}
