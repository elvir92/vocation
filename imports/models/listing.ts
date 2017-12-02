import {IListGroup} from "./list_group";
import {IList} from "./list";

export interface IListing {
    listGroup: IListGroup;
    lists: IList[];
}
