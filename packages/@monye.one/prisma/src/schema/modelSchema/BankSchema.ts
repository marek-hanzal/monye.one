import { z } from 'zod';
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type TransactionWithRelations, TransactionWithRelationsSchema } from './TransactionSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'
import { type TransactionPartialWithRelations, TransactionPartialWithRelationsSchema } from './TransactionSchema'

/////////////////////////////////////////
// BANK SCHEMA
/////////////////////////////////////////

export const BankSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  account: z.string(),
})

export type Bank = z.infer<typeof BankSchema>

// BANK PARTIAL SCHEMA
//------------------------------------------------------

export const BankPartialSchema = BankSchema.partial()

export type BankPartial = z.infer<typeof BankPartialSchema>

// BANK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const BankOptionalDefaultsSchema = BankSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type BankOptionalDefaults = z.infer<typeof BankOptionalDefaultsSchema>

// BANK RELATION SCHEMA
//------------------------------------------------------

export type BankRelations = {
  user: UserWithRelations;
  Transaction: TransactionWithRelations[];
};

export type BankWithRelations = z.infer<typeof BankSchema> & BankRelations

export const BankWithRelationsSchema: z.ZodType<BankWithRelations> = BankSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
}))

// BANK OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type BankOptionalDefaultsWithRelations = z.infer<typeof BankOptionalDefaultsSchema> & BankRelations

export const BankOptionalDefaultsWithRelationsSchema: z.ZodType<BankOptionalDefaultsWithRelations> = BankOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
}))

// BANK PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type BankPartialRelations = {
  user?: UserPartialWithRelations;
  Transaction?: TransactionPartialWithRelations[];
};

export type BankPartialWithRelations = z.infer<typeof BankPartialSchema> & BankPartialRelations

export const BankPartialWithRelationsSchema: z.ZodType<BankPartialWithRelations> = BankPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  Transaction: z.lazy(() => TransactionPartialWithRelationsSchema).array(),
})).partial()

export default BankSchema;
