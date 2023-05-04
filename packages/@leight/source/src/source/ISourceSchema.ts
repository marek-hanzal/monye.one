import {
    type IUseMutation,
    type IUseQuery
}          from "@leight/react-query";
import {z} from "@leight/zod";
import {
    type ICreateSchema,
    type ICursor,
    type ICursorSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IFilterSchema,
    type IParamsSchema,
    type IPatchSchema,
    type ISortSchema,
    type IToCreateSchema,
    type IToPatchSchema,
    type IWithIdentity
}          from "../schema";

/**
 * This is required as a type, but also as a structure holding schemas for
 * a Source.
 */
export interface ISourceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> {
    Schema: ISourceSchema.Schema<
        TEntitySchema,
        TDtoSchema,
        TToCreateSchema,
        TCreateSchema,
        TToPatchSchema,
        TPatchSchema,
        TFilterSchema,
        TSortSchema,
        TParamsSchema
    >;
    Type: ISourceSchema.Type<
        TEntitySchema,
        TDtoSchema,
        TToCreateSchema,
        TCreateSchema,
        TToPatchSchema,
        TPatchSchema,
        TFilterSchema,
        TSortSchema,
        TParamsSchema
    >;
}

export namespace ISourceSchema {
    export type Schema<
        TEntitySchema extends IEntitySchema = IEntitySchema,
        TDtoSchema extends IDtoSchema = IDtoSchema,
        TToCreateSchema extends IToCreateSchema = IToCreateSchema,
        TCreateSchema extends ICreateSchema = ICreateSchema,
        TToPatchSchema extends IToPatchSchema = IToPatchSchema,
        TPatchSchema extends IPatchSchema = IPatchSchema,
        TFilterSchema extends IFilterSchema = IFilterSchema,
        TSortSchema extends ISortSchema = ISortSchema,
        TParamsSchema extends IParamsSchema = IParamsSchema,
    > = {
        Source: Schema.Source<
            TEntitySchema,
            TCreateSchema,
            TPatchSchema,
            TFilterSchema,
            TSortSchema,
            TParamsSchema
        >;
        Mapper: Schema.Mapper<
            TDtoSchema,
            TToCreateSchema,
            TToPatchSchema
        >;
    }

    export namespace Schema {
        export interface Source<
            TEntitySchema extends IEntitySchema = IEntitySchema,
            TCreateSchema extends ICreateSchema = ICreateSchema,
            TPatchSchema extends IPatchSchema = IPatchSchema,
            TFilterSchema extends IFilterSchema = IFilterSchema,
            TSortSchema extends ISortSchema = ISortSchema,
            TParamsSchema extends IParamsSchema = IParamsSchema,
        > {
            EntitySchema: TEntitySchema;
            CreateSchema: TCreateSchema;
            PatchSchema: TPatchSchema;
            FilterSchema: TFilterSchema;
            UpsertSchema: z.ZodObject<{
                create: TCreateSchema;
                patch: TPatchSchema;
                filter: TFilterSchema;
            }>;
            SortSchema: TSortSchema;
            ParamsSchema: TParamsSchema;
            CursorSchema: ICursorSchema;
            QuerySchema: z.ZodObject<{
                filter: z.ZodOptional<TFilterSchema>;
                sort: z.ZodOptional<TSortSchema>;
                cursor: z.ZodOptional<ICursorSchema>;
                params: z.ZodOptional<TParamsSchema>;
            }>;
            QueryOptionalSchema: z.ZodOptional<
                z.ZodObject<{
                    filter: z.ZodOptional<TFilterSchema>;
                    sort: z.ZodOptional<TSortSchema>;
                    cursor: z.ZodOptional<ICursorSchema>;
                    params: z.ZodOptional<TParamsSchema>;
                }>
            >;
        }

        export interface Mapper<
            TDtoSchema extends IDtoSchema = IDtoSchema,
            TToCreateSchema extends IToCreateSchema = IToCreateSchema,
            TToPatchSchema extends IToPatchSchema = IToPatchSchema,
        > {
            DtoSchema: TDtoSchema;
            ToCreateSchema: TToCreateSchema;
            ToPatchSchema: TToPatchSchema;
        }
    }

    export interface Type<
        TEntitySchema extends IEntitySchema = IEntitySchema,
        TDtoSchema extends IDtoSchema = IDtoSchema,
        TToCreateSchema extends IToCreateSchema = IToCreateSchema,
        TCreateSchema extends ICreateSchema = ICreateSchema,
        TToPatchSchema extends IToPatchSchema = IToPatchSchema,
        TPatchSchema extends IPatchSchema = IPatchSchema,
        TFilterSchema extends IFilterSchema = IFilterSchema,
        TSortSchema extends ISortSchema = ISortSchema,
        TParamsSchema extends IParamsSchema = IParamsSchema,
    > {
        Source: Type.Source<
            TEntitySchema,
            TCreateSchema,
            TPatchSchema,
            TFilterSchema,
            TSortSchema,
            TParamsSchema
        >;
        Mapper: Type.Mapper<
            TDtoSchema,
            TToCreateSchema,
            TToPatchSchema
        >;
        UseQuery: Type.UseQuery<
            Type.Source<
                TEntitySchema,
                TCreateSchema,
                TPatchSchema,
                TFilterSchema,
                TSortSchema,
                TParamsSchema
            >,
            Type.Mapper<
                TDtoSchema,
                TToCreateSchema,
                TToPatchSchema
            >
        >;
    }

    export namespace Type {
        export interface Source<
            TEntitySchema extends IEntitySchema = IEntitySchema,
            TCreateSchema extends ICreateSchema = ICreateSchema,
            TPatchSchema extends IPatchSchema = IPatchSchema,
            TFilterSchema extends IFilterSchema = IFilterSchema,
            TSortSchema extends ISortSchema = ISortSchema,
            TParamsSchema extends IParamsSchema = IParamsSchema,
        > {
            Entity: z.infer<TEntitySchema>;
            Create: z.infer<TCreateSchema>;
            Patch: Source.IPatch<
                TPatchSchema,
                TFilterSchema
            >;
            PatchBy: Source.IPatchBy<
                TPatchSchema,
                TFilterSchema
            >;
            Delete: IWithIdentity;
            DeleteBy: z.infer<TFilterSchema>;
            Count: z.infer<TFilterSchema>;
            Filter: z.infer<TFilterSchema>;
            Upsert: Source.IUpsert<
                TCreateSchema,
                TPatchSchema,
                TFilterSchema
            >;
            Sort: z.infer<TSortSchema>;
            Params: z.infer<TParamsSchema>;
            Cursor: ICursor;
            Query: Source.IQuery<
                TFilterSchema,
                TSortSchema,
                TPatchSchema
            >;
            Query$: Source.IQuery<
                TFilterSchema,
                TSortSchema,
                TPatchSchema
            > | undefined;
            Fetch: z.infer<TFilterSchema>;
            Fetch$: z.infer<TFilterSchema>;
        }

        export namespace Source {
            export interface IPatch<
                TPatchSchema extends IPatchSchema = IPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                patch: z.infer<TPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }

            export interface IPatchBy<
                TPatchSchema extends IPatchSchema = IPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                patch: z.infer<TPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }

            export interface IUpsert<
                TCreateSchema extends ICreateSchema = ICreateSchema,
                TPatchSchema extends IPatchSchema = IPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                create: z.infer<TCreateSchema>;
                patch: z.infer<TPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }

            export interface IQuery<
                TFilterSchema extends IFilterSchema = IFilterSchema,
                TSortSchema extends ISortSchema = ISortSchema,
                TParamsSchema extends IParamsSchema = IParamsSchema,
            > {
                filter?: z.infer<TFilterSchema>;
                sort?: z.infer<TSortSchema>;
                cursor?: ICursor;
                params?: z.infer<TParamsSchema>;
            }
        }

        export interface Mapper<
            TDtoSchema extends IDtoSchema = IDtoSchema,
            TToCreateSchema extends IToCreateSchema = IToCreateSchema,
            TToPatchSchema extends IToPatchSchema = IToPatchSchema,
            TFilterSchema extends IFilterSchema = IFilterSchema,
        > {
            Dto: z.infer<TDtoSchema>;
            ToCreate: z.infer<TToCreateSchema>;
            ToPatch: Mapper.IToPatch<
                TToPatchSchema,
                TFilterSchema
            >;
            ToPatchBy: Mapper.IToPatchBy<
                TToPatchSchema,
                TFilterSchema
            >;
            Upsert: Mapper.IUpsert<
                TToCreateSchema,
                TToPatchSchema,
                TFilterSchema
            >;
        }

        export namespace Mapper {
            export interface IToPatch<
                TToPatchSchema extends IToPatchSchema = IToPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                patch: z.infer<TToPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }

            export interface IToPatchBy<
                TToPatchSchema extends IToPatchSchema = IToPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                patch: z.infer<TToPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }

            export interface IUpsert<
                TToCreateSchema extends IToCreateSchema = IToCreateSchema,
                TToPatchSchema extends IToPatchSchema = IToPatchSchema,
                TFilterSchema extends IFilterSchema = IFilterSchema,
            > {
                create: z.infer<TToCreateSchema>;
                patch: z.infer<TToPatchSchema>;
                filter: z.infer<TFilterSchema>;
            }
        }

        export interface UseQuery<
            TSourceType extends Type.Source,
            TMapperType extends Type.Mapper,
        > {
            useCreate: IUseMutation<TMapperType["ToCreate"], TMapperType["Dto"]>;
            usePatch: IUseMutation<TMapperType["ToPatch"], TMapperType["Dto"]>;
            usePatchBy: IUseMutation<TMapperType["ToPatchBy"], unknown>;
            useUpsert: IUseMutation<TMapperType["Upsert"], TMapperType["Dto"]>;
            useDelete: IUseMutation<TSourceType["Delete"], TMapperType["Dto"]>;
            useDeleteBy: IUseMutation<TSourceType["DeleteBy"], TMapperType["Dto"][]>;
            useQuery: IUseQuery<TSourceType["Query"], TMapperType["Dto"][]>;
            useCount: IUseQuery<TSourceType["Count"], number>;
            useFetch: IUseQuery<TSourceType["Fetch"], TMapperType["Dto"]>;
            useFetch$: IUseQuery<TSourceType["Fetch$"], TMapperType["Dto"] | undefined>;
            useGet: IUseQuery<IWithIdentity, TMapperType["Dto"]>;
            useGet$: IUseQuery<Partial<IWithIdentity>, TMapperType["Dto"] | null>;
        }

        export namespace UseQuery {
            export type Invalidator = () => () => void;
        }
    }
}

export interface ISourceSchemaEx<
    TWhereSchema extends z.ZodType = z.ZodType,
    TWhereUniqueSchema extends z.ZodType = z.ZodType,
    TOrderBySchema extends z.ZodType = z.ZodType,
> {
    Schema: ISourceSchemaEx.Schema<
        TWhereSchema,
        TWhereUniqueSchema,
        TOrderBySchema
    >;
    Type: ISourceSchemaEx.Type<
        TWhereSchema,
        TWhereUniqueSchema,
        TOrderBySchema
    >;
}

export namespace ISourceSchemaEx {
    export interface Schema<
        TWhereSchema extends z.ZodType = z.ZodType,
        TWhereUniqueSchema extends z.ZodType = z.ZodType,
        TOrderBySchema extends z.ZodType = z.ZodType,
    > {
        WhereSchema: TWhereSchema;
        WhereUniqueSchema: TWhereUniqueSchema;
        OrderBySchema: TOrderBySchema;
    }

    export interface Type<
        TWhereSchema extends z.ZodType = z.ZodType,
        TWhereUniqueSchema extends z.ZodType = z.ZodType,
        TOrderBySchema extends z.ZodType = z.ZodType,
    > {
        Where: z.infer<TWhereSchema>;
        WhereUnique: z.infer<TWhereUniqueSchema>;
        OrderBy: z.infer<TOrderBySchema>;
    }
}
