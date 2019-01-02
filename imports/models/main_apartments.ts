import { IProperty } from "./property";
import { IPropertyType } from "./property_type";
import { IPicture } from "./picture";
import { IReservations } from "./reservations";

export interface IApartment {
    property: IProperty;
    pictures: IPicture[];
    type: IPropertyType;
    reservations: IReservations[];
}
