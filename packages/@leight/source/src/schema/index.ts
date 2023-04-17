import {z} from "@leight/zod";

export const WithIdentitySchema = z.object({
    id: z.string(),
});
export type IWithIdentitySchema = typeof WithIdentitySchema;
export type IWithIdentity = z.infer<IWithIdentitySchema>;

export const EntitySchema = z.object({}).merge(WithIdentitySchema);
export type IEntitySchema = typeof EntitySchema;
export type IEntity = z.infer<IEntitySchema>;

export const CreateSchema = z.object({});
export type ICreateSchema = z.ZodObject<any>;
export type ICreate = z.infer<ICreateSchema>;

export const ToCreateSchema = z.object({});
export type IToCreateSchema = z.ZodObject<any>;
export type IToCreate = z.infer<IToCreateSchema>;

export const PatchSchema = z.object({
    id: z.string(),
});
export type IPatchSchema = typeof PatchSchema;
export type IPatch = z.infer<IPatchSchema>;
