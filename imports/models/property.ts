import { ILocation } from "./geo_location";
import { ILengthUnit } from "./length_unit";
import { IText } from "./text";
import { IPicture } from "./picture";

export interface IProperty {
    _id?: string;
    userId?: string;    
    propertyTypeId?: string;
    name?: IText[];
    headline?: IText[];
    summary?: IText[];
    description?: IText[];
    bedroomDescription?: IText[];
    bathroomDescription?: IText[];
    propertySize: 0,
    maxGuest: 0,
    geoLocation?: ILocation;
    activities?: string[];
    images?: string[];
    pricing?: IPropertyPrice[];
    basePrice?: number;
    places?: IPropertyPlace[];
    insertedAt?: Date;
    updatedAt?: Date;
    isActive: boolean;
    isEditMode: boolean;
}

export interface IPropertyPrice {
    name: string;
    start: Date;
    end: Date;
    value: string;
}

export interface IPropertyPlace {
    placeId: string;
    title: IText[],
    distanceValue: string,
    distanceType: ILengthUnit
}


export interface IPropertyPictures {
    property: IProperty;
    pictures: IPicture[],
}