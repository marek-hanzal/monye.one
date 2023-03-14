import { z } from 'zod';

export const FileScalarFieldEnumSchema = z.enum(['id','path','name','mime','size','location','ttl','created','updated','userId']);

export default FileScalarFieldEnumSchema;
