import { z } from 'zod';

export const TranslationScalarFieldEnumSchema = z.enum(['id','locale','label','text','hash']);

export default TranslationScalarFieldEnumSchema;
