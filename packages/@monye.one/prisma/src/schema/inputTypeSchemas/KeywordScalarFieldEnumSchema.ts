import { z } from 'zod';

export const KeywordScalarFieldEnumSchema = z.enum(['id','text']);

export default KeywordScalarFieldEnumSchema;
