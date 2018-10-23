import {ILocation} from "./geo_location";
import {ILengthUnit} from "./length_unit";
import {IText} from "./text";
import {IPicture} from "./picture";

export interface IProperty {
    _id?: string;
    userId?: string;
    addressId?: string;
    propertyTypeId?: string;
    name?: IText [];
    headline?: IText [];
    summary?: IText [];
    description?: IText [];
    geoLocation?: ILocation;
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


export interface IPropertyPictures {
    property: IProperty;
    pictures: IPicture [],
}