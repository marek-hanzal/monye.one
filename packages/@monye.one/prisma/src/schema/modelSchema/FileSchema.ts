import { z } from 'zod';
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////

export const FileSchema = z.object({
  id: z.string().cuid(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().nullish(),
  created: z.coerce.date(),
  updated: z.coerce.date().nullish(),
  userId: z.string().nullish(),
})

export type File = z.infer<typeof FileSchema>

// FILE PARTIAL SCHEMA
//------------------------------------------------------

export const FilePartialSchema = FileSchema.partial()

export type FilePartial = z.infer<typeof FilePartialSchema>

// FILE RELATION SCHEMA
//------------------------------------------------------

export type FileRelations = {
  user?: UserWithRelations | null;
};

export type FileWithRelations = z.infer<typeof FileSchema> & FileRelations

export const FileWithRelationsSchema: z.ZodType<FileWithRelations> = FileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
}))

// FILE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type FilePartialRelations = {
  user?: UserPartialWithRelations | null;
};

export type FilePartialWithRelations = z.infer<typeof FilePartialSchema> & FilePartialRelations

export const FilePartialWithRelationsSchema: z.ZodType<FilePartialWithRelations> = FilePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
})).partial()

export default FileSchema;
