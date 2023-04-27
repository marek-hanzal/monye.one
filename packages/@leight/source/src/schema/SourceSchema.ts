import {z} from "@leight/zod";

export const WithIdentitySchema = z.object({
    id: z.string(),
});
export type IWithIdentitySchema = typeof WithIdentitySchema;
export type IWithIdentity = z.infer<IWithIdentitySchema>;

export const WithOptionalIdentitySchema = z.object({
    id: z.string().optional(),
}).optional();
export type IWithOptionalIdentitySchema = typeof WithOptionalIdentitySchema;
export type IWithOptionalIdentity = z.infer<IWithOptionalIdentitySchema>;

export const EntitySchema = z.object({}).merge(WithIdentitySchema);
export type IEntitySchema = typeof EntitySchema;
export type IEntity = z.infer<IEntitySchema>;

export const DtoSchema = z.object({}).merge(WithIdentitySchema);
export type IDtoSchema = typeof DtoSchema;
export type IDto = z.infer<IDtoSchema>;

export const CreateSchema = z.object({});
export type ICreateSchema = z.ZodObject<any>;
export type ICreate = z.infer<ICreateSchema>;

export const ToCreateSchema = z.object({});
export type IToCreateSchema = z.ZodObject<any>;
export type IToCreate = z.infer<IToCreateSchema>;

export const PatchSchema = WithIdentitySchema;
export type IPatchSchema = typeof PatchSchema;
export type IPatch = z.infer<IPatchSchema>;

export const ToPatchSchema = WithIdentitySchema;
export type IToPatchSchema = typeof ToPatchSchema;
export type IToPatch = z.infer<IToPatchSchema>;
