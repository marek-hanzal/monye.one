import {type ISourceSchema} from "./ISourceSchema";
import {type ISourceStore}  from "./ISourceStore";

export interface IUseSourceProps<TSourceSchema extends ISourceSchema> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchema["Schema"]["Source"]["EntitySchema"];
    SourceStore: ISourceStore<TSourceSchema>;
    cacheTime?: number;
}
