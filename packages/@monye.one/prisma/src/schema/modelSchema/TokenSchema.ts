import { z } from 'zod';
import { type UserTokenWithRelations, UserTokenWithRelationsSchema } from './UserTokenSchema'
import { type UserTokenPartialWithRelations, UserTokenPartialWithRelationsSchema } from './UserTokenSchema'

/////////////////////////////////////////
// TOKEN SCHEMA
/////////////////////////////////////////

export const TokenSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Token = z.infer<typeof TokenSchema>

// TOKEN PARTIAL SCHEMA
//------------------------------------------------------

export const TokenPartialSchema = TokenSchema.partial()

export type TokenPartial = z.infer<typeof TokenPartialSchema>

// TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TokenOptionalDefaultsSchema = TokenSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type TokenOptionalDefaults = z.infer<typeof TokenOptionalDefaultsSchema>

// TOKEN RELATION SCHEMA
//------------------------------------------------------

export type TokenRelations = {
  UserToken: UserTokenWithRelations[];
};

export type TokenWithRelations = z.infer<typeof TokenSchema> & TokenRelations

export const TokenWithRelationsSchema: z.ZodType<TokenWithRelations> = TokenSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
}))

// TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TokenOptionalDefaultsWithRelations = z.infer<typeof TokenOptionalDefaultsSchema> & TokenRelations

export const TokenOptionalDefaultsWithRelationsSchema: z.ZodType<TokenOptionalDefaultsWithRelations> = TokenOptionalDefaultsSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
}))

// TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TokenPartialRelations = {
  UserToken?: UserTokenPartialWithRelations[];
};

export type TokenPartialWithRelations = z.infer<typeof TokenPartialSchema> & TokenPartialRelations

export const TokenPartialWithRelationsSchema: z.ZodType<TokenPartialWithRelations> = TokenPartialSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenPartialWithRelationsSchema).array(),
})).partial()

export default TokenSchema;
