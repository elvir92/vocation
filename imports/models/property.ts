import {ILocation} from "./location";
import {ILengthUnit} from "./length_unit";
import {IText} from "./text";

export interface IProperty {
    _id?: string;
    userId?: string;
    name?: IText [];
    headline?: IText [];
    summary?: IText [];
    description?: IText [];
    location?: ILocation;
    activities?: string[];
    images?: string[];
    places?: IPropertyPlace[];
    insertedAt?: Date;
    updatedAt?: Date;
    isActive: boolean;
    isEditMode: boolean;
}

export interface IPropertyPlace {
    placeId: string;
    title: IText [],
    distanceValue: string,
    distanceType: ILengthUnit
}