import {type ISourceSchema} from "./ISourceSchema";
import {type SourceType} from "./SourceType";

/**
 * Client side Source tools.
 */
export interface ISource<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> {
    name: string;
    schema: TSourceSchema;
    repository: TSourceType["UseRepository"];
    query: TSourceType["QueryContext"];
    use: TSourceType["Use"];
    useInvalidator: TSourceType["UseInvalidator"];
}
