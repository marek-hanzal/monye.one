import {type IUseQueryResult}   from "@leight/react-query";
import {type ISourceSchemaType} from "./ISourceSchemaType";

export type IUseSource<TSourceSchemaType extends ISourceSchemaType> = {
    result: IUseQueryResult<TSourceSchemaType["Dto"][]>;
    data: TSourceSchemaType["Dto"][];
}
