import {
    type IKeywordPrismaSchemaType,
    type IKeywordSourceSchemaType
}                                from "@leight/keyword";
import {KeywordBasePrismaSource} from "../sdk";

export class KeywordSource extends KeywordBasePrismaSource {
    toWhereUnique(filter: IKeywordSourceSchemaType["Filter"]): IKeywordPrismaSchemaType["WhereUnique"] {
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
