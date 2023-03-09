import { z } from 'zod';
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type TokenWithRelations, TokenWithRelationsSchema } from './TokenSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'
import { type TokenPartialWithRelations, TokenPartialWithRelationsSchema } from './TokenSchema'

/////////////////////////////////////////
// USER TOKEN SCHEMA
/////////////////////////////////////////

export const UserTokenSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  tokenId: z.string(),
})

export type UserToken = z.infer<typeof UserTokenSchema>

// USER TOKEN PARTIAL SCHEMA
//------------------------------------------------------

export const UserTokenPartialSchema = UserTokenSchema.partial()

export type UserTokenPartial = z.infer<typeof UserTokenPartialSchema>

// USER TOKEN RELATION SCHEMA
//------------------------------------------------------

export type UserTokenRelations = {
  user: UserWithRelations;
  token: TokenWithRelations;
};

export type UserTokenWithRelations = z.infer<typeof UserTokenSchema> & UserTokenRelations

export const UserTokenWithRelationsSchema: z.ZodType<UserTokenWithRelations> = UserTokenSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  token: z.lazy(() => TokenWithRelationsSchema),
}))

// USER TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserTokenPartialRelations = {
  user?: UserPartialWithRelations;
  token?: TokenPartialWithRelations;
};

export type UserTokenPartialWithRelations = z.infer<typeof UserTokenPartialSchema> & UserTokenPartialRelations

export const UserTokenPartialWithRelationsSchema: z.ZodType<UserTokenPartialWithRelations> = UserTokenPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  token: z.lazy(() => TokenPartialWithRelationsSchema),
})).partial()

export default UserTokenSchema;
