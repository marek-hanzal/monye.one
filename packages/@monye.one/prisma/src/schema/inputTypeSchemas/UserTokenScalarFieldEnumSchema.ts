import { z } from 'zod';

export const UserTokenScalarFieldEnumSchema = z.enum(['id','userId','tokenId']);

export default UserTokenScalarFieldEnumSchema;
