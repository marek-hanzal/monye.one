import { z } from 'zod';

export const BankScalarFieldEnumSchema = z.enum(['id','userId','account']);

export default BankScalarFieldEnumSchema;
