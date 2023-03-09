import { z } from 'zod';

export const JobLogScalarFieldEnumSchema = z.enum(['id','jobId','message']);

export default JobLogScalarFieldEnumSchema;
