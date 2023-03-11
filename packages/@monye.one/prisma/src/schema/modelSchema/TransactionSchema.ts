import { z } from 'zod';
import { DecimalJSLikeSchema } from "../inputTypeSchemas/DecimalJsLikeSchema"
import { isValidDecimalInput } from "../inputTypeSchemas/isValidDecimalInput"
import { Prisma } from "@prisma/client"
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type BankWithRelations, BankWithRelationsSchema } from './BankSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'
import { type BankPartialWithRelations, BankPartialWithRelationsSchema } from './BankSchema'

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  id: z.string().cuid(),
  reference: z.string(),
  userId: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'amount' must be a Decimal. Location: ['Models', 'Transaction']",  }),
  variable: z.string().nullish(),
  symbol: z.string().nullish(),
  static: z.string().nullish(),
  date: z.coerce.date(),
  target: z.string().nullish(),
  note: z.string().nullish(),
})

export type Transaction = z.infer<typeof TransactionSchema>

// TRANSACTION PARTIAL SCHEMA
//------------------------------------------------------

export const TransactionPartialSchema = TransactionSchema.partial()

export type TransactionPartial = z.infer<typeof TransactionPartialSchema>

// TRANSACTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TransactionOptionalDefaultsSchema = TransactionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type TransactionOptionalDefaults = z.infer<typeof TransactionOptionalDefaultsSchema>

// TRANSACTION RELATION SCHEMA
//------------------------------------------------------

export type TransactionRelations = {
  user: UserWithRelations;
  bank: BankWithRelations;
};

export type TransactionWithRelations = z.infer<typeof TransactionSchema> & TransactionRelations

export const TransactionWithRelationsSchema: z.ZodType<TransactionWithRelations> = TransactionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  bank: z.lazy(() => BankWithRelationsSchema),
}))

// TRANSACTION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TransactionOptionalDefaultsWithRelations = z.infer<typeof TransactionOptionalDefaultsSchema> & TransactionRelations

export const TransactionOptionalDefaultsWithRelationsSchema: z.ZodType<TransactionOptionalDefaultsWithRelations> = TransactionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  bank: z.lazy(() => BankWithRelationsSchema),
}))

// TRANSACTION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TransactionPartialRelations = {
  user?: UserPartialWithRelations;
  bank?: BankPartialWithRelations;
};

export type TransactionPartialWithRelations = z.infer<typeof TransactionPartialSchema> & TransactionPartialRelations

export const TransactionPartialWithRelationsSchema: z.ZodType<TransactionPartialWithRelations> = TransactionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  bank: z.lazy(() => BankPartialWithRelationsSchema),
})).partial()

export default TransactionSchema;
