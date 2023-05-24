import {z}            from "@leight/utils";
import {FilterSchema} from "./FilterSchema";

export const WithIdentitySchema = z.object({
    id: z.string(),
});
export type IWithIdentitySchema = typeof WithIdentitySchema;
export type IWithIdentity = z.infer<IWithIdentitySchema>;

export const WithIdentity$Schema = z.object({
    id: z.string().optional(),
}).optional();
export type IWithIdentity$Schema = typeof WithIdentity$Schema;
export type IWithIdentity$ = z.infer<IWithIdentity$Schema>;

export const EntitySchema = WithIdentitySchema;
export type IEntitySchema = typeof EntitySchema;
export type IEntity = z.infer<IEntitySchema>;

export const DtoSchema = WithIdentitySchema;
export type IDtoSchema = typeof DtoSchema;
export type IDto = z.infer<IDtoSchema>;

export const CreateSchema = z.object({});
export type ICreateSchema = z.ZodObject<any, "strip">;
export type ICreate = z.infer<ICreateSchema>;

export const ToCreateSchema = z.object({});
export type IToCreateSchema = z.ZodObject<any, "strip">;
export type IToCreate = z.infer<IToCreateSchema>;

export const PatchSchema = z.object({});
export type IPatchSchema = z.ZodObject<any, "strip">;
export type IPatch = z.infer<IPatchSchema>;

export const ToPatchSchema = z.object({});
export type IToPatchSchema = z.ZodObject<any, "strip">;
export type IToPatch = z.infer<IToPatchSchema>;

export const ToPatchPropsSchema = z.object({
    patch:  ToPatchSchema,
    filter: FilterSchema,
});
export type IToPatchPropsSchema = typeof ToPatchPropsSchema;
export type IToPatchProps = z.infer<IToPatchPropsSchema>;
