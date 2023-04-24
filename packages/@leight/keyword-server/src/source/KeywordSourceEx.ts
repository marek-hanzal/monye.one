import {
    type IKeywordPrismaSchemaType,
    type IKeywordSourceSchemaType
}                                from "@leight/keyword";
import {KeywordBasePrismaSource} from "../sdk/Source/KeywordBasePrismaSource";

export class KeywordSourceEx extends KeywordBasePrismaSource {
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
