import {type ISource}       from "./ISource";
import {type ISourceMapper} from "./ISourceMapper";
import {type ISourceSchema} from "./ISourceSchema";

export interface ISourceService<TSourceSchema extends ISourceSchema> {
    handleCreate(props: ISourceService.IHandleCreateProps<TSourceSchema>): Promise<TSourceSchema["Dto"]>;

    handleSourceCreate(create: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]>;

    toCreate(toCreate: TSourceSchema["ToCreate"]): Promise<TSourceSchema["Create"]>;

    handlePatch(props: ISourceService.IHandlePatchProps<TSourceSchema>): Promise<TSourceSchema["Dto"]>;

    handleSourcePatch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]>;

    toPatch(toPatch: TSourceSchema["ToPatch"]): Promise<TSourceSchema["Patch"]>;

    toDto(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Dto"]>;

    /**
     * Do something with a DTO; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withDto(dto: TSourceSchema["Dto"]): Promise<TSourceSchema["Dto"]>;

    /**
     * Do something with an Entity; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withEntity(entity: TSourceSchema["Entity"]): Promise<TSourceSchema["Entity"]>;

    /**
     * Get source mapper
     */
    mapper(): ISourceMapper<TSourceSchema>;

    /**
     * Get current source
     */
    source(): ISource<TSourceSchema>;
}

export namespace ISourceService {
    export interface IHandleCreateProps<TSourceSchema extends ISourceSchema> {
        toCreate: TSourceSchema["ToCreate"];
    }

    export interface IHandlePatchProps<TSourceSchema extends ISourceSchema> {
        toPatch: TSourceSchema["ToPatch"];
    }
}
