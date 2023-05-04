import {type IUseQueryResult} from "@leight/react-query";
import {type ISourceSchema}   from "./ISourceSchema";

export type IUseSource<TSourceSchema extends ISourceSchema> = {
    result: IUseQueryResult<TSourceSchema["Type"]["Mapper"]["Dto"][]>;
    data: TSourceSchema["Type"]["Mapper"]["Dto"][];
}
