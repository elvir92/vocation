import {IText} from "./text";


export interface IListGroup {
    _id?: string;
    title: IText [];
    isActive: boolean;
}
