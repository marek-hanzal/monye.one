import {type ISource}           from "./ISource";
import {type ISourceMapper}     from "./ISourceMapper";
import {type ISourceSchemaType} from "./ISourceSchemaType";

export interface ISourceService<TSourceSchemaType extends ISourceSchemaType> {
    handleCreate(props: ISourceService.IHandleCreateProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;

    handleSourceCreate(create: TSourceSchemaType["Create"]): Promise<TSourceSchemaType["Entity"]>;

    toCreate(toCreate: TSourceSchemaType["ToCreate"]): Promise<TSourceSchemaType["Create"]>;

    handlePatch(props: ISourceService.IHandlePatchProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;

    handleSourcePatch(patch: ISource.IPatch<TSourceSchemaType>): Promise<TSourceSchemaType["Entity"]>;

    handlePatchBy(props: ISourceService.IHandlePatchByProps<TSourceSchemaType>): Promise<unknown>;

    handleSourcePatchBy(patch: ISource.IPatchBy<TSourceSchemaType>): Promise<unknown>;

    toPatch(toPatch: TSourceSchemaType["ToPatch"]): Promise<TSourceSchemaType["Patch"]>;

    handleUpsert(props: ISourceService.IHandleUpsertProps<TSourceSchemaType>): Promise<TSourceSchemaType["Dto"]>;

    toDto(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Dto"]>;

    /**
     * Do something with a DTO; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withDto(dto: TSourceSchemaType["Dto"]): Promise<TSourceSchemaType["Dto"]>;

    /**
     * Do something with an Entity; schema modifications are not allowed as this should
     * handle SourceMapper
     */
    withEntity(entity: TSourceSchemaType["Entity"]): Promise<TSourceSchemaType["Entity"]>;

    /**
     * Get source mapper
     */
    mapper(): ISourceMapper<TSourceSchemaType>;

    /**
     * Get current source
     */
    source(): ISource<TSourceSchemaType>;
}

export namespace ISourceService {
    export interface IHandleCreateProps<TSourceSchemaType extends ISourceSchemaType> {
        toCreate: TSourceSchemaType["ToCreate"];
    }

    export interface IHandlePatchProps<TSourceSchemaType extends ISourceSchemaType> {
        toPatch: TSourceSchemaType["ToPatch"];
        filter: TSourceSchemaType["Filter"];
    }

    export interface IHandlePatchByProps<TSourceSchemaType extends ISourceSchemaType> {
        toPatch: TSourceSchemaType["ToPatch"];
        filter: TSourceSchemaType["Filter"];
    }

    export interface IHandleUpsertProps<TSourceSchemaType extends ISourceSchemaType> {
        toCreate: TSourceSchemaType["ToCreate"],
        toPatch: TSourceSchemaType["ToPatch"],
        filter: TSourceSchemaType["Filter"],
    }
}
