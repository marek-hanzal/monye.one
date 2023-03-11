import {WithIdentitySchema} from "@leight/source";
import {PrismaSchema}       from "@monye.one/prisma";
import {z}                  from "zod";

export const BankSchema = PrismaSchema.BankSchema;
export type IBankSchema = typeof BankSchema;
export type IBank = z.infer<IBankSchema>;

export const BankCreateSchema = PrismaSchema.BankOptionalDefaultsSchema;
export type IBankCreateSchema = typeof BankCreateSchema;
export type IBankCreate = z.infer<IBankCreateSchema>;

export const BankPatchSchema = PrismaSchema.BankPartialSchema.merge(WithIdentitySchema);
export type IBankPatchSchema = typeof BankPatchSchema;
export type IBankPatch = z.infer<IBankPatchSchema>;
