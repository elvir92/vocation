import {IText} from "./text";

export interface IList {
    _id?: string;
    parentId?: string;
    title: IText [];
    isActive: boolean;
}