import {type ISourceSchemaType} from "./ISourceSchemaType";
import {type ISourceStore}      from "./ISourceStore";

export interface IUseSourceProps<TSourceSchemaType extends ISourceSchemaType> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchemaType["EntitySchema"];
    SourceStore: ISourceStore<TSourceSchemaType>;
    cacheTime?: number;
}
