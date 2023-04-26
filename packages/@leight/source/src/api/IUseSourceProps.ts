import {type ISourceSchemaType} from "./ISourceSchemaType";
import {type ISourceStore}      from "./ISourceStore";
import {type IUseSourceQuery}   from "./IUseSourceQuery";

export interface IUseSourceProps<TSourceSchemaType extends ISourceSchemaType> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchemaType["EntitySchema"];
    /**
     * React query used to actually query data
     */
    UseSourceQuery: IUseSourceQuery<TSourceSchemaType>;
    SourceStore: ISourceStore<TSourceSchemaType>;
    cacheTime?: number;
}
