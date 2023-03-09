import { z } from 'zod';

export const JobScalarFieldEnumSchema = z.enum(['id','name','status','total','progress','success','successRatio','failure','failureRatio','skip','skipRatio','created','started','finished','userId','params']);

export default JobScalarFieldEnumSchema;
