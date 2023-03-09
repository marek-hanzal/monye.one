import { z } from 'zod';

export const TransactionScalarFieldEnumSchema = z.enum(['id','reference','userId','bankId','amount','variable','symbol','static','date','target','note']);

export default TransactionScalarFieldEnumSchema;
