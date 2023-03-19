import {PrismaSchema}       from "@leight/prisma";
import {WithIdentitySchema} from "@leight/source";
import {type z}             from "zod";

export const UserSchema = PrismaSchema.UserSchema;
export type IUserSchema = typeof UserSchema;
export type IUser = z.infer<IUserSchema>;

export const UserCreateSchema = PrismaSchema.UserOptionalDefaultsSchema;
export type IUserCreateSchema = typeof UserCreateSchema;
export type IUserCreate = z.infer<IUserCreateSchema>;

export const UserPatchSchema = PrismaSchema.UserPartialSchema.merge(WithIdentitySchema);
export type IUserPatchSchema = typeof UserPatchSchema;
export type IUserPatch = z.infer<IUserPatchSchema>;
