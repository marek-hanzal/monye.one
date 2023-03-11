import { z } from 'zod';
import { type AccountWithRelations, AccountWithRelationsSchema } from './AccountSchema'
import { type SessionWithRelations, SessionWithRelationsSchema } from './SessionSchema'
import { type UserTokenWithRelations, UserTokenWithRelationsSchema } from './UserTokenSchema'
import { type TransactionWithRelations, TransactionWithRelationsSchema } from './TransactionSchema'
import { type JobWithRelations, JobWithRelationsSchema } from './JobSchema'
import { type FileWithRelations, FileWithRelationsSchema } from './FileSchema'
import { type BankWithRelations, BankWithRelationsSchema } from './BankSchema'
import { type AccountPartialWithRelations, AccountPartialWithRelationsSchema } from './AccountSchema'
import { type SessionPartialWithRelations, SessionPartialWithRelationsSchema } from './SessionSchema'
import { type UserTokenPartialWithRelations, UserTokenPartialWithRelationsSchema } from './UserTokenSchema'
import { type TransactionPartialWithRelations, TransactionPartialWithRelationsSchema } from './TransactionSchema'
import { type JobPartialWithRelations, JobPartialWithRelationsSchema } from './JobSchema'
import { type FilePartialWithRelations, FilePartialWithRelationsSchema } from './FileSchema'
import { type BankPartialWithRelations, BankPartialWithRelationsSchema } from './BankSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER PARTIAL SCHEMA
//------------------------------------------------------

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  UserToken: UserTokenWithRelations[];
  Transaction: TransactionWithRelations[];
  Job: JobWithRelations[];
  File: FileWithRelations[];
  Bank: BankWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
  Job: z.lazy(() => JobWithRelationsSchema).array(),
  File: z.lazy(() => FileWithRelationsSchema).array(),
  Bank: z.lazy(() => BankWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
  Job: z.lazy(() => JobWithRelationsSchema).array(),
  File: z.lazy(() => FileWithRelationsSchema).array(),
  Bank: z.lazy(() => BankWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  accounts?: AccountPartialWithRelations[];
  sessions?: SessionPartialWithRelations[];
  UserToken?: UserTokenPartialWithRelations[];
  Transaction?: TransactionPartialWithRelations[];
  Job?: JobPartialWithRelations[];
  File?: FilePartialWithRelations[];
  Bank?: BankPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenPartialWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionPartialWithRelationsSchema).array(),
  Job: z.lazy(() => JobPartialWithRelationsSchema).array(),
  File: z.lazy(() => FilePartialWithRelationsSchema).array(),
  Bank: z.lazy(() => BankPartialWithRelationsSchema).array(),
})).partial()

export default UserSchema;
