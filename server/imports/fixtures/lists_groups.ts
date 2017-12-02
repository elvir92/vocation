import {ListsGroups} from '../../../imports/collections/lists_groups';
import {Lists} from '../../../imports/collections/lists';
import {IList, IText, IListGroup} from "../../../imports/models/index";


export function loadListGroupsAndLists() {


    if (ListsGroups.find({}).fetch().length == 0) {
        for (let i = 0; i < 12; i++) {
            let tlt: IText = {
                text: Fake.sentence(1),
                language: 'en'
            };
            let arrayText: IText [] = [tlt];
            let listGroup: IListGroup = {
                isActive: true,
                title: arrayText
            };
            let listGroupId = ListsGroups.collection.insert(listGroup);

            for (let j = 0; j < 12; j++) {
                let txt: IText = {
                    text: Fake.sentence(10),
                    language: 'en'
                };
                let arrayLst: IText [] = [txt];
                let item: IList = {
                    isActive: true,
                    parentId: listGroupId,
                    title: arrayLst
                };
                Lists.collection.insert(item);
            }
        }
    }
}