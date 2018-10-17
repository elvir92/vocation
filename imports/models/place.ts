import {IText} from "./text";

export interface IPlace {
    _id?: string;
    title: IText [];
    placeholder: IText [];
    isActive: boolean;    
}
