import { z } from 'zod';

export const TokenScalarFieldEnumSchema = z.enum(['id','name']);

export default TokenScalarFieldEnumSchema;
