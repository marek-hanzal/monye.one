import {
    type IKeywordRepositoryExType,
    type IKeywordSourceType
}                                from "@leight/keyword";
import {BaseKeywordRepositoryEx} from "../sdk";

export class KeywordRepository extends BaseKeywordRepositoryEx {
    toWhereUnique(filter: IKeywordSourceType["Filter"]): IKeywordRepositoryExType["WhereUnique"] {
        if (!filter) {
            return {};
        }

        const {keyword} = filter;
        if (keyword) {
            return {
                text: keyword,
            };
        }

        return {};
    }
}
