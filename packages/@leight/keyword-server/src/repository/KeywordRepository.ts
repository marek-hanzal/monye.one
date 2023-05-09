import {type IKeywordRepositorySchemaEx, type KeywordSource} from "@leight/keyword";
import {BaseKeywordRepositoryEx} from "../sdk";

export class KeywordRepository extends BaseKeywordRepositoryEx {
    toWhereUnique(filter: KeywordSource["Type"]["Filter"]): IKeywordRepositorySchemaEx["Type"]["WhereUnique"] {
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
