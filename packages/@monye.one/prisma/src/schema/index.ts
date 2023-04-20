import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;

// DECIMAL
//------------------------------------------------------

export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });

export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const BankScalarFieldEnumSchema = z.enum(['id','userId','account','description','balanceValue','balanceDate']);

export const FileScalarFieldEnumSchema = z.enum(['id','path','name','mime','size','location','ttl','created','updated','userId']);

export const JobLogScalarFieldEnumSchema = z.enum(['id','jobId','message']);

export const JobScalarFieldEnumSchema = z.enum(['id','name','status','total','progress','success','successRatio','failure','failureRatio','skip','skipRatio','created','started','finished','userId','params']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const KeywordScalarFieldEnumSchema = z.enum(['id','text']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TokenScalarFieldEnumSchema = z.enum(['id','name']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','reference','userId','bankId','amount','variable','symbol','static','date','target','note']);

export const TranslationScalarFieldEnumSchema = z.enum(['id','locale','label','text','hash']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const UserTokenScalarFieldEnumSchema = z.enum(['id','userId','tokenId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const JobStatusSchema = z.enum(['NEW','RUNNING','SUCCESS','FAILURE','REVIEW','DONE']);

export type JobStatusType = `${z.infer<typeof JobStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT PARTIAL SCHEMA
//------------------------------------------------------

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccountOptionalDefaultsWithRelations = z.infer<typeof AccountOptionalDefaultsSchema> & AccountRelations

export const AccountOptionalDefaultsWithRelationsSchema: z.ZodType<AccountOptionalDefaultsWithRelations> = AccountOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

// SESSION PARTIAL SCHEMA
//------------------------------------------------------

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// SESSION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type SessionOptionalDefaultsWithRelations = z.infer<typeof SessionOptionalDefaultsSchema> & SessionRelations

export const SessionOptionalDefaultsWithRelationsSchema: z.ZodType<SessionOptionalDefaultsWithRelations> = SessionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// SESSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type SessionPartialRelations = {
  user?: UserPartialWithRelations;
};

export type SessionPartialWithRelations = z.infer<typeof SessionPartialSchema> & SessionPartialRelations

export const SessionPartialWithRelationsSchema: z.ZodType<SessionPartialWithRelations> = SessionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER PARTIAL SCHEMA
//------------------------------------------------------

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  UserToken: UserTokenWithRelations[];
  Transaction: TransactionWithRelations[];
  Job: JobWithRelations[];
  File: FileWithRelations[];
  Bank: BankWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
  Job: z.lazy(() => JobWithRelationsSchema).array(),
  File: z.lazy(() => FileWithRelationsSchema).array(),
  Bank: z.lazy(() => BankWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
  Job: z.lazy(() => JobWithRelationsSchema).array(),
  File: z.lazy(() => FileWithRelationsSchema).array(),
  Bank: z.lazy(() => BankWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  accounts?: AccountPartialWithRelations[];
  sessions?: SessionPartialWithRelations[];
  UserToken?: UserTokenPartialWithRelations[];
  Transaction?: TransactionPartialWithRelations[];
  Job?: JobPartialWithRelations[];
  File?: FilePartialWithRelations[];
  Bank?: BankPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  UserToken: z.lazy(() => UserTokenPartialWithRelationsSchema).array(),
  Transaction: z.lazy(() => TransactionPartialWithRelationsSchema).array(),
  Job: z.lazy(() => JobPartialWithRelationsSchema).array(),
  File: z.lazy(() => FilePartialWithRelationsSchema).array(),
  Bank: z.lazy(() => BankPartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

// VERIFICATION TOKEN PARTIAL SCHEMA
//------------------------------------------------------

export const VerificationTokenPartialSchema = VerificationTokenSchema.partial()

export type VerificationTokenPartial = z.infer<typeof VerificationTokenPartialSchema>

/////////////////////////////////////////
// TOKEN SCHEMA
/////////////////////////////////////////

export const TokenSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Token = z.infer<typeof TokenSchema>

// TOKEN PARTIAL SCHEMA
//------------------------------------------------------

export const TokenPartialSchema = TokenSchema.partial()

export type TokenPartial = z.infer<typeof TokenPartialSchema>

// TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TokenOptionalDefaultsSchema = TokenSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type TokenOptionalDefaults = z.infer<typeof TokenOptionalDefaultsSchema>

// TOKEN RELATION SCHEMA
//------------------------------------------------------

export type TokenRelations = {
  UserToken: UserTokenWithRelations[];
};

export type TokenWithRelations = z.infer<typeof TokenSchema> & TokenRelations

export const TokenWithRelationsSchema: z.ZodType<TokenWithRelations> = TokenSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
}))

// TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TokenOptionalDefaultsWithRelations = z.infer<typeof TokenOptionalDefaultsSchema> & TokenRelations

export const TokenOptionalDefaultsWithRelationsSchema: z.ZodType<TokenOptionalDefaultsWithRelations> = TokenOptionalDefaultsSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenWithRelationsSchema).array(),
}))

// TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TokenPartialRelations = {
  UserToken?: UserTokenPartialWithRelations[];
};

export type TokenPartialWithRelations = z.infer<typeof TokenPartialSchema> & TokenPartialRelations

export const TokenPartialWithRelationsSchema: z.ZodType<TokenPartialWithRelations> = TokenPartialSchema.merge(z.object({
  UserToken: z.lazy(() => UserTokenPartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// USER TOKEN SCHEMA
/////////////////////////////////////////

export const UserTokenSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  tokenId: z.string(),
})

export type UserToken = z.infer<typeof UserTokenSchema>

// USER TOKEN PARTIAL SCHEMA
//------------------------------------------------------

export const UserTokenPartialSchema = UserTokenSchema.partial()

export type UserTokenPartial = z.infer<typeof UserTokenPartialSchema>

// USER TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserTokenOptionalDefaultsSchema = UserTokenSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserTokenOptionalDefaults = z.infer<typeof UserTokenOptionalDefaultsSchema>

// USER TOKEN RELATION SCHEMA
//------------------------------------------------------

export type UserTokenRelations = {
  user: UserWithRelations;
  token: TokenWithRelations;
};

export type UserTokenWithRelations = z.infer<typeof UserTokenSchema> & UserTokenRelations

export const UserTokenWithRelationsSchema: z.ZodType<UserTokenWithRelations> = UserTokenSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  token: z.lazy(() => TokenWithRelationsSchema),
}))

// USER TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserTokenOptionalDefaultsWithRelations = z.infer<typeof UserTokenOptionalDefaultsSchema> & UserTokenRelations

export const UserTokenOptionalDefaultsWithRelationsSchema: z.ZodType<UserTokenOptionalDefaultsWithRelations> = UserTokenOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  token: z.lazy(() => TokenWithRelationsSchema),
}))

// USER TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserTokenPartialRelations = {
  user?: UserPartialWithRelations;
  token?: TokenPartialWithRelations;
};

export type UserTokenPartialWithRelations = z.infer<typeof UserTokenPartialSchema> & UserTokenPartialRelations

export const UserTokenPartialWithRelationsSchema: z.ZodType<UserTokenPartialWithRelations> = UserTokenPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  token: z.lazy(() => TokenPartialWithRelationsSchema),
})).partial()

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

// FILE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FileOptionalDefaultsSchema = FileSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type FileOptionalDefaults = z.infer<typeof FileOptionalDefaultsSchema>

// FILE RELATION SCHEMA
//------------------------------------------------------

export type FileRelations = {
  user?: UserWithRelations | null;
};

export type FileWithRelations = z.infer<typeof FileSchema> & FileRelations

export const FileWithRelationsSchema: z.ZodType<FileWithRelations> = FileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
}))

// FILE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type FileOptionalDefaultsWithRelations = z.infer<typeof FileOptionalDefaultsSchema> & FileRelations

export const FileOptionalDefaultsWithRelationsSchema: z.ZodType<FileOptionalDefaultsWithRelations> = FileOptionalDefaultsSchema.merge(z.object({
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

/////////////////////////////////////////
// TRANSLATION SCHEMA
/////////////////////////////////////////

export const TranslationSchema = z.object({
  id: z.string().cuid(),
  locale: z.string(),
  label: z.string(),
  text: z.string(),
  hash: z.string(),
})

export type Translation = z.infer<typeof TranslationSchema>

// TRANSLATION PARTIAL SCHEMA
//------------------------------------------------------

export const TranslationPartialSchema = TranslationSchema.partial()

export type TranslationPartial = z.infer<typeof TranslationPartialSchema>

// TRANSLATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TranslationOptionalDefaultsSchema = TranslationSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type TranslationOptionalDefaults = z.infer<typeof TranslationOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB SCHEMA
/////////////////////////////////////////

export const JobSchema = z.object({
  status: JobStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  total: z.number().int(),
  progress: z.number(),
  success: z.number().int().nullish(),
  successRatio: z.number().nullish(),
  failure: z.number().int().nullish(),
  failureRatio: z.number().nullish(),
  skip: z.number().int().nullish(),
  skipRatio: z.number().nullish(),
  created: z.coerce.date(),
  started: z.coerce.date().nullish(),
  finished: z.coerce.date().nullish(),
  userId: z.string().nullish(),
  params: NullableJsonValue.optional(),
})

export type Job = z.infer<typeof JobSchema>

// JOB PARTIAL SCHEMA
//------------------------------------------------------

export const JobPartialSchema = JobSchema.partial()

export type JobPartial = z.infer<typeof JobPartialSchema>

// JOB OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobOptionalDefaultsSchema = JobSchema.merge(z.object({
  status: JobStatusSchema.optional(),
  id: z.string().cuid().optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
}))

export type JobOptionalDefaults = z.infer<typeof JobOptionalDefaultsSchema>

// JOB RELATION SCHEMA
//------------------------------------------------------

export type JobRelations = {
  user?: UserWithRelations | null;
  logs: JobLogWithRelations[];
};

export type JobWithRelations = Omit<z.infer<typeof JobSchema>, "params"> & {
  params?: NullableJsonInput;
} & JobRelations

export const JobWithRelationsSchema: z.ZodType<JobWithRelations> = JobSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
  logs: z.lazy(() => JobLogWithRelationsSchema).array(),
}))

// JOB OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type JobOptionalDefaultsWithRelations = Omit<z.infer<typeof JobOptionalDefaultsSchema>, "params"> & {
  params?: NullableJsonInput;
} & JobRelations

export const JobOptionalDefaultsWithRelationsSchema: z.ZodType<JobOptionalDefaultsWithRelations> = JobOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
  logs: z.lazy(() => JobLogWithRelationsSchema).array(),
}))

// JOB PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type JobPartialRelations = {
  user?: UserPartialWithRelations | null;
  logs?: JobLogPartialWithRelations[];
};

export type JobPartialWithRelations = Omit<z.infer<typeof JobPartialSchema>, "params"> & {
  params?: NullableJsonInput;
} & JobPartialRelations

export const JobPartialWithRelationsSchema: z.ZodType<JobPartialWithRelations> = JobPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  logs: z.lazy(() => JobLogPartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// JOB LOG SCHEMA
/////////////////////////////////////////

export const JobLogSchema = z.object({
  id: z.string().cuid(),
  jobId: z.string(),
  message: z.string(),
})

export type JobLog = z.infer<typeof JobLogSchema>

// JOB LOG PARTIAL SCHEMA
//------------------------------------------------------

export const JobLogPartialSchema = JobLogSchema.partial()

export type JobLogPartial = z.infer<typeof JobLogPartialSchema>

// JOB LOG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobLogOptionalDefaultsSchema = JobLogSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type JobLogOptionalDefaults = z.infer<typeof JobLogOptionalDefaultsSchema>

// JOB LOG RELATION SCHEMA
//------------------------------------------------------

export type JobLogRelations = {
  job: JobWithRelations;
};

export type JobLogWithRelations = z.infer<typeof JobLogSchema> & JobLogRelations

export const JobLogWithRelationsSchema: z.ZodType<JobLogWithRelations> = JobLogSchema.merge(z.object({
  job: z.lazy(() => JobWithRelationsSchema),
}))

// JOB LOG OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type JobLogOptionalDefaultsWithRelations = z.infer<typeof JobLogOptionalDefaultsSchema> & JobLogRelations

export const JobLogOptionalDefaultsWithRelationsSchema: z.ZodType<JobLogOptionalDefaultsWithRelations> = JobLogOptionalDefaultsSchema.merge(z.object({
  job: z.lazy(() => JobWithRelationsSchema),
}))

// JOB LOG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type JobLogPartialRelations = {
  job?: JobPartialWithRelations;
};

export type JobLogPartialWithRelations = z.infer<typeof JobLogPartialSchema> & JobLogPartialRelations

export const JobLogPartialWithRelationsSchema: z.ZodType<JobLogPartialWithRelations> = JobLogPartialSchema.merge(z.object({
  job: z.lazy(() => JobPartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// KEYWORD SCHEMA
/////////////////////////////////////////

export const KeywordSchema = z.object({
  id: z.string().cuid(),
  text: z.string(),
})

export type Keyword = z.infer<typeof KeywordSchema>

// KEYWORD PARTIAL SCHEMA
//------------------------------------------------------

export const KeywordPartialSchema = KeywordSchema.partial()

export type KeywordPartial = z.infer<typeof KeywordPartialSchema>

// KEYWORD OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const KeywordOptionalDefaultsSchema = KeywordSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type KeywordOptionalDefaults = z.infer<typeof KeywordOptionalDefaultsSchema>

/////////////////////////////////////////
// BANK SCHEMA
/////////////////////////////////////////

export const BankSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  account: z.string(),
  description: z.string().nullish(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'balanceValue' must be a Decimal. Location: ['Models', 'Bank']",  }).nullish(),
  balanceDate: z.coerce.date().nullish(),
})

export type Bank = z.infer<typeof BankSchema>

// BANK PARTIAL SCHEMA
//------------------------------------------------------

export const BankPartialSchema = BankSchema.partial()

export type BankPartial = z.infer<typeof BankPartialSchema>

// BANK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const BankOptionalDefaultsSchema = BankSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type BankOptionalDefaults = z.infer<typeof BankOptionalDefaultsSchema>

// BANK RELATION SCHEMA
//------------------------------------------------------

export type BankRelations = {
  user: UserWithRelations;
  Transaction: TransactionWithRelations[];
};

export type BankWithRelations = z.infer<typeof BankSchema> & BankRelations

export const BankWithRelationsSchema: z.ZodType<BankWithRelations> = BankSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
}))

// BANK OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type BankOptionalDefaultsWithRelations = z.infer<typeof BankOptionalDefaultsSchema> & BankRelations

export const BankOptionalDefaultsWithRelationsSchema: z.ZodType<BankOptionalDefaultsWithRelations> = BankOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  Transaction: z.lazy(() => TransactionWithRelationsSchema).array(),
}))

// BANK PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type BankPartialRelations = {
  user?: UserPartialWithRelations;
  Transaction?: TransactionPartialWithRelations[];
};

export type BankPartialWithRelations = z.infer<typeof BankPartialSchema> & BankPartialRelations

export const BankPartialWithRelationsSchema: z.ZodType<BankPartialWithRelations> = BankPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  Transaction: z.lazy(() => TransactionPartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  id: z.string().cuid(),
  reference: z.string(),
  userId: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'amount' must be a Decimal. Location: ['Models', 'Transaction']",  }),
  variable: z.string().nullish(),
  symbol: z.string().nullish(),
  static: z.string().nullish(),
  date: z.coerce.date(),
  target: z.string().nullish(),
  note: z.string().nullish(),
})

export type Transaction = z.infer<typeof TransactionSchema>

// TRANSACTION PARTIAL SCHEMA
//------------------------------------------------------

export const TransactionPartialSchema = TransactionSchema.partial()

export type TransactionPartial = z.infer<typeof TransactionPartialSchema>

// TRANSACTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TransactionOptionalDefaultsSchema = TransactionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type TransactionOptionalDefaults = z.infer<typeof TransactionOptionalDefaultsSchema>

// TRANSACTION RELATION SCHEMA
//------------------------------------------------------

export type TransactionRelations = {
  user: UserWithRelations;
  bank: BankWithRelations;
};

export type TransactionWithRelations = z.infer<typeof TransactionSchema> & TransactionRelations

export const TransactionWithRelationsSchema: z.ZodType<TransactionWithRelations> = TransactionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  bank: z.lazy(() => BankWithRelationsSchema),
}))

// TRANSACTION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TransactionOptionalDefaultsWithRelations = z.infer<typeof TransactionOptionalDefaultsSchema> & TransactionRelations

export const TransactionOptionalDefaultsWithRelationsSchema: z.ZodType<TransactionOptionalDefaultsWithRelations> = TransactionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  bank: z.lazy(() => BankWithRelationsSchema),
}))

// TRANSACTION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TransactionPartialRelations = {
  user?: UserPartialWithRelations;
  bank?: BankPartialWithRelations;
};

export type TransactionPartialWithRelations = z.infer<typeof TransactionPartialSchema> & TransactionPartialRelations

export const TransactionPartialWithRelationsSchema: z.ZodType<TransactionPartialWithRelations> = TransactionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  bank: z.lazy(() => BankPartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  Job: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Bank: z.union([z.boolean(),z.lazy(() => BankFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  UserToken: z.boolean().optional(),
  Transaction: z.boolean().optional(),
  Job: z.boolean().optional(),
  File: z.boolean().optional(),
  Bank: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  Job: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Bank: z.union([z.boolean(),z.lazy(() => BankFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// TOKEN
//------------------------------------------------------

export const TokenIncludeSchema: z.ZodType<Prisma.TokenInclude> = z.object({
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TokenCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TokenArgsSchema: z.ZodType<Prisma.TokenArgs> = z.object({
  select: z.lazy(() => TokenSelectSchema).optional(),
  include: z.lazy(() => TokenIncludeSchema).optional(),
}).strict();

export const TokenCountOutputTypeArgsSchema: z.ZodType<Prisma.TokenCountOutputTypeArgs> = z.object({
  select: z.lazy(() => TokenCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TokenCountOutputTypeSelectSchema: z.ZodType<Prisma.TokenCountOutputTypeSelect> = z.object({
  UserToken: z.boolean().optional(),
}).strict();

export const TokenSelectSchema: z.ZodType<Prisma.TokenSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TokenCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER TOKEN
//------------------------------------------------------

export const UserTokenIncludeSchema: z.ZodType<Prisma.UserTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  token: z.union([z.boolean(),z.lazy(() => TokenArgsSchema)]).optional(),
}).strict()

export const UserTokenArgsSchema: z.ZodType<Prisma.UserTokenArgs> = z.object({
  select: z.lazy(() => UserTokenSelectSchema).optional(),
  include: z.lazy(() => UserTokenIncludeSchema).optional(),
}).strict();

export const UserTokenSelectSchema: z.ZodType<Prisma.UserTokenSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tokenId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  token: z.union([z.boolean(),z.lazy(() => TokenArgsSchema)]).optional(),
}).strict()

// FILE
//------------------------------------------------------

export const FileIncludeSchema: z.ZodType<Prisma.FileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FileArgsSchema: z.ZodType<Prisma.FileArgs> = z.object({
  select: z.lazy(() => FileSelectSchema).optional(),
  include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();

export const FileSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
  id: z.boolean().optional(),
  path: z.boolean().optional(),
  name: z.boolean().optional(),
  mime: z.boolean().optional(),
  size: z.boolean().optional(),
  location: z.boolean().optional(),
  ttl: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TRANSLATION
//------------------------------------------------------

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  locale: z.boolean().optional(),
  label: z.boolean().optional(),
  text: z.boolean().optional(),
  hash: z.boolean().optional(),
}).strict()

// JOB
//------------------------------------------------------

export const JobIncludeSchema: z.ZodType<Prisma.JobInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => JobLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const JobArgsSchema: z.ZodType<Prisma.JobArgs> = z.object({
  select: z.lazy(() => JobSelectSchema).optional(),
  include: z.lazy(() => JobIncludeSchema).optional(),
}).strict();

export const JobCountOutputTypeArgsSchema: z.ZodType<Prisma.JobCountOutputTypeArgs> = z.object({
  select: z.lazy(() => JobCountOutputTypeSelectSchema).nullish(),
}).strict();

export const JobCountOutputTypeSelectSchema: z.ZodType<Prisma.JobCountOutputTypeSelect> = z.object({
  logs: z.boolean().optional(),
}).strict();

export const JobSelectSchema: z.ZodType<Prisma.JobSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  status: z.boolean().optional(),
  total: z.boolean().optional(),
  progress: z.boolean().optional(),
  success: z.boolean().optional(),
  successRatio: z.boolean().optional(),
  failure: z.boolean().optional(),
  failureRatio: z.boolean().optional(),
  skip: z.boolean().optional(),
  skipRatio: z.boolean().optional(),
  created: z.boolean().optional(),
  started: z.boolean().optional(),
  finished: z.boolean().optional(),
  userId: z.boolean().optional(),
  params: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => JobLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

// JOB LOG
//------------------------------------------------------

export const JobLogIncludeSchema: z.ZodType<Prisma.JobLogInclude> = z.object({
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
}).strict()

export const JobLogArgsSchema: z.ZodType<Prisma.JobLogArgs> = z.object({
  select: z.lazy(() => JobLogSelectSchema).optional(),
  include: z.lazy(() => JobLogIncludeSchema).optional(),
}).strict();

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  message: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
}).strict()

// KEYWORD
//------------------------------------------------------

export const KeywordSelectSchema: z.ZodType<Prisma.KeywordSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

// BANK
//------------------------------------------------------

export const BankIncludeSchema: z.ZodType<Prisma.BankInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BankCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BankArgsSchema: z.ZodType<Prisma.BankArgs> = z.object({
  select: z.lazy(() => BankSelectSchema).optional(),
  include: z.lazy(() => BankIncludeSchema).optional(),
}).strict();

export const BankCountOutputTypeArgsSchema: z.ZodType<Prisma.BankCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BankCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BankCountOutputTypeSelectSchema: z.ZodType<Prisma.BankCountOutputTypeSelect> = z.object({
  Transaction: z.boolean().optional(),
}).strict();

export const BankSelectSchema: z.ZodType<Prisma.BankSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  account: z.boolean().optional(),
  description: z.boolean().optional(),
  balanceValue: z.boolean().optional(),
  balanceDate: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Transaction: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BankCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSACTION
//------------------------------------------------------

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bank: z.union([z.boolean(),z.lazy(() => BankArgsSchema)]).optional(),
}).strict()

export const TransactionArgsSchema: z.ZodType<Prisma.TransactionArgs> = z.object({
  select: z.lazy(() => TransactionSelectSchema).optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
}).strict();

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  reference: z.boolean().optional(),
  userId: z.boolean().optional(),
  bankId: z.boolean().optional(),
  amount: z.boolean().optional(),
  variable: z.boolean().optional(),
  symbol: z.boolean().optional(),
  static: z.boolean().optional(),
  date: z.boolean().optional(),
  target: z.boolean().optional(),
  note: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bank: z.union([z.boolean(),z.lazy(() => BankArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  UserToken: z.lazy(() => UserTokenListRelationFilterSchema).optional(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  Job: z.lazy(() => JobListRelationFilterSchema).optional(),
  File: z.lazy(() => FileListRelationFilterSchema).optional(),
  Bank: z.lazy(() => BankListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenOrderByRelationAggregateInputSchema).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional(),
  Job: z.lazy(() => JobOrderByRelationAggregateInputSchema).optional(),
  File: z.lazy(() => FileOrderByRelationAggregateInputSchema).optional(),
  Bank: z.lazy(() => BankOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TokenWhereInputSchema: z.ZodType<Prisma.TokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  UserToken: z.lazy(() => UserTokenListRelationFilterSchema).optional()
}).strict();

export const TokenOrderByWithRelationInputSchema: z.ZodType<Prisma.TokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  UserToken: z.lazy(() => UserTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TokenWhereUniqueInputSchema: z.ZodType<Prisma.TokenWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional()
}).strict();

export const TokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.TokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const TokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserTokenWhereInputSchema: z.ZodType<Prisma.UserTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenWhereInputSchema),z.lazy(() => UserTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenWhereInputSchema),z.lazy(() => UserTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  token: z.union([ z.lazy(() => TokenRelationFilterSchema),z.lazy(() => TokenWhereInputSchema) ]).optional(),
}).strict();

export const UserTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  token: z.lazy(() => TokenOrderByWithRelationInputSchema).optional()
}).strict();

export const UserTokenWhereUniqueInputSchema: z.ZodType<Prisma.UserTokenWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_tokenId: z.lazy(() => UserTokenUserIdTokenIdCompoundUniqueInputSchema).optional()
}).strict();

export const UserTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FileWhereInputSchema: z.ZodType<Prisma.FileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ttl: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FileOrderByWithRelationInputSchema: z.ZodType<Prisma.FileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FileWhereUniqueInputSchema: z.ZodType<Prisma.FileWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_path_name: z.lazy(() => FileUserIdPathNameCompoundUniqueInputSchema).optional()
}).strict();

export const FileOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FileSumOrderByAggregateInputSchema).optional()
}).strict();

export const FileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mime: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ttl: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TranslationWhereInputSchema: z.ZodType<Prisma.TranslationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TranslationOrderByWithRelationInputSchema: z.ZodType<Prisma.TranslationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationWhereUniqueInputSchema: z.ZodType<Prisma.TranslationWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  locale_hash: z.lazy(() => TranslationLocaleHashCompoundUniqueInputSchema).optional()
}).strict();

export const TranslationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TranslationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TranslationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TranslationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TranslationMinOrderByAggregateInputSchema).optional()
}).strict();

export const TranslationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TranslationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const JobWhereInputSchema: z.ZodType<Prisma.JobWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumJobStatusFilterSchema),z.lazy(() => JobStatusSchema) ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  progress: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  success: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  successRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  failure: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  failureRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  skip: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  skipRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  params: z.lazy(() => JsonNullableFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  logs: z.lazy(() => JobLogListRelationFilterSchema).optional()
}).strict();

export const JobOrderByWithRelationInputSchema: z.ZodType<Prisma.JobOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  params: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  logs: z.lazy(() => JobLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const JobWhereUniqueInputSchema: z.ZodType<Prisma.JobWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const JobOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  params: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JobAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JobSumOrderByAggregateInputSchema).optional()
}).strict();

export const JobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobScalarWhereWithAggregatesInputSchema),z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobScalarWhereWithAggregatesInputSchema),z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumJobStatusWithAggregatesFilterSchema),z.lazy(() => JobStatusSchema) ]).optional(),
  total: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  progress: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  success: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  successRatio: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  failure: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  failureRatio: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  skip: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  skipRatio: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const JobLogWhereInputSchema: z.ZodType<Prisma.JobLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogWhereInputSchema),z.lazy(() => JobLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogWhereInputSchema),z.lazy(() => JobLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job: z.union([ z.lazy(() => JobRelationFilterSchema),z.lazy(() => JobWhereInputSchema) ]).optional(),
}).strict();

export const JobLogOrderByWithRelationInputSchema: z.ZodType<Prisma.JobLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  job: z.lazy(() => JobOrderByWithRelationInputSchema).optional()
}).strict();

export const JobLogWhereUniqueInputSchema: z.ZodType<Prisma.JobLogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const JobLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobLogMinOrderByAggregateInputSchema).optional()
}).strict();

export const JobLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema),z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema),z.lazy(() => JobLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const KeywordWhereInputSchema: z.ZodType<Prisma.KeywordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KeywordWhereInputSchema),z.lazy(() => KeywordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeywordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeywordWhereInputSchema),z.lazy(() => KeywordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const KeywordOrderByWithRelationInputSchema: z.ZodType<Prisma.KeywordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeywordWhereUniqueInputSchema: z.ZodType<Prisma.KeywordWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string().optional()
}).strict();

export const KeywordOrderByWithAggregationInputSchema: z.ZodType<Prisma.KeywordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KeywordCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KeywordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KeywordMinOrderByAggregateInputSchema).optional()
}).strict();

export const KeywordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KeywordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BankWhereInputSchema: z.ZodType<Prisma.BankWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankWhereInputSchema),z.lazy(() => BankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankWhereInputSchema),z.lazy(() => BankWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balanceValue: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  balanceDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export const BankOrderByWithRelationInputSchema: z.ZodType<Prisma.BankOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balanceValue: z.lazy(() => SortOrderSchema).optional(),
  balanceDate: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BankWhereUniqueInputSchema: z.ZodType<Prisma.BankWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_account: z.lazy(() => BankUserIdAccountCompoundUniqueInputSchema).optional()
}).strict();

export const BankOrderByWithAggregationInputSchema: z.ZodType<Prisma.BankOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balanceValue: z.lazy(() => SortOrderSchema).optional(),
  balanceDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BankCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BankAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BankMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BankMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BankSumOrderByAggregateInputSchema).optional()
}).strict();

export const BankScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BankScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BankScalarWhereWithAggregatesInputSchema),z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankScalarWhereWithAggregatesInputSchema),z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  balanceValue: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  balanceDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  variable: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  static: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  bank: z.union([ z.lazy(() => BankRelationFilterSchema),z.lazy(() => BankWhereInputSchema) ]).optional(),
}).strict();

export const TransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  bank: z.lazy(() => BankOrderByWithRelationInputSchema).optional()
}).strict();

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_reference: z.lazy(() => TransactionUserIdReferenceCompoundUniqueInputSchema).optional()
}).strict();

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reference: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bankId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  variable: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  static: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  target: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenCreateInputSchema: z.ZodType<Prisma.TokenCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutTokenInputSchema).optional()
}).strict();

export const TokenUncheckedCreateInputSchema: z.ZodType<Prisma.TokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutTokenInputSchema).optional()
}).strict();

export const TokenUpdateInputSchema: z.ZodType<Prisma.TokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutTokenNestedInputSchema).optional()
}).strict();

export const TokenUncheckedUpdateInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutTokenNestedInputSchema).optional()
}).strict();

export const TokenCreateManyInputSchema: z.ZodType<Prisma.TokenCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const TokenUpdateManyMutationInputSchema: z.ZodType<Prisma.TokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTokenCreateInputSchema: z.ZodType<Prisma.UserTokenCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTokenInputSchema),
  token: z.lazy(() => TokenCreateNestedOneWithoutUserTokenInputSchema)
}).strict();

export const UserTokenUncheckedCreateInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  tokenId: z.string()
}).strict();

export const UserTokenUpdateInputSchema: z.ZodType<Prisma.UserTokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional(),
  token: z.lazy(() => TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional()
}).strict();

export const UserTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTokenCreateManyInputSchema: z.ZodType<Prisma.UserTokenCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  tokenId: z.string()
}).strict();

export const UserTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.UserTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateInputSchema: z.ZodType<Prisma.FileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutFileInputSchema).optional()
}).strict();

export const FileUncheckedCreateInputSchema: z.ZodType<Prisma.FileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const FileUpdateInputSchema: z.ZodType<Prisma.FileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutFileNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateInputSchema: z.ZodType<Prisma.FileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileCreateManyInputSchema: z.ZodType<Prisma.FileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const FileUpdateManyMutationInputSchema: z.ZodType<Prisma.FileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TranslationCreateInputSchema: z.ZodType<Prisma.TranslationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  locale: z.string(),
  label: z.string(),
  text: z.string(),
  hash: z.string()
}).strict();

export const TranslationUncheckedCreateInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  locale: z.string(),
  label: z.string(),
  text: z.string(),
  hash: z.string()
}).strict();

export const TranslationUpdateInputSchema: z.ZodType<Prisma.TranslationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationCreateManyInputSchema: z.ZodType<Prisma.TranslationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  locale: z.string(),
  label: z.string(),
  text: z.string(),
  hash: z.string()
}).strict();

export const TranslationUpdateManyMutationInputSchema: z.ZodType<Prisma.TranslationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobCreateInputSchema: z.ZodType<Prisma.JobCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
  success: z.number().int().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().int().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().int().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobInputSchema).optional(),
  logs: z.lazy(() => JobLogCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobUncheckedCreateInputSchema: z.ZodType<Prisma.JobUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
  success: z.number().int().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().int().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().int().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogUncheckedCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobUpdateInputSchema: z.ZodType<Prisma.JobUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutJobNestedInputSchema).optional(),
  logs: z.lazy(() => JobLogUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateInputSchema: z.ZodType<Prisma.JobUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogUncheckedUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobCreateManyInputSchema: z.ZodType<Prisma.JobCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
  success: z.number().int().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().int().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().int().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const JobUpdateManyMutationInputSchema: z.ZodType<Prisma.JobUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const JobUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const JobLogCreateInputSchema: z.ZodType<Prisma.JobLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string(),
  job: z.lazy(() => JobCreateNestedOneWithoutLogsInputSchema)
}).strict();

export const JobLogUncheckedCreateInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  message: z.string()
}).strict();

export const JobLogUpdateInputSchema: z.ZodType<Prisma.JobLogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job: z.lazy(() => JobUpdateOneRequiredWithoutLogsNestedInputSchema).optional()
}).strict();

export const JobLogUncheckedUpdateInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobLogCreateManyInputSchema: z.ZodType<Prisma.JobLogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  message: z.string()
}).strict();

export const JobLogUpdateManyMutationInputSchema: z.ZodType<Prisma.JobLogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeywordCreateInputSchema: z.ZodType<Prisma.KeywordCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export const KeywordUncheckedCreateInputSchema: z.ZodType<Prisma.KeywordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export const KeywordUpdateInputSchema: z.ZodType<Prisma.KeywordUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeywordUncheckedUpdateInputSchema: z.ZodType<Prisma.KeywordUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeywordCreateManyInputSchema: z.ZodType<Prisma.KeywordCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string()
}).strict();

export const KeywordUpdateManyMutationInputSchema: z.ZodType<Prisma.KeywordUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeywordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KeywordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankCreateInputSchema: z.ZodType<Prisma.BankCreateInput> = z.object({
  id: z.string().cuid().optional(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankInputSchema),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutBankInputSchema).optional()
}).strict();

export const BankUncheckedCreateInputSchema: z.ZodType<Prisma.BankUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutBankInputSchema).optional()
}).strict();

export const BankUpdateInputSchema: z.ZodType<Prisma.BankUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBankNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export const BankUncheckedUpdateInputSchema: z.ZodType<Prisma.BankUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export const BankCreateManyInputSchema: z.ZodType<Prisma.BankCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable()
}).strict();

export const BankUpdateManyMutationInputSchema: z.ZodType<Prisma.BankUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BankUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BankUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionCreateInputSchema: z.ZodType<Prisma.TransactionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTransactionInputSchema),
  bank: z.lazy(() => BankCreateNestedOneWithoutTransactionInputSchema)
}).strict();

export const TransactionUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  userId: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const TransactionUpdateInputSchema: z.ZodType<Prisma.TransactionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTransactionNestedInputSchema).optional(),
  bank: z.lazy(() => BankUpdateOneRequiredWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionCreateManyInputSchema: z.ZodType<Prisma.TransactionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  userId: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const TransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const UserTokenListRelationFilterSchema: z.ZodType<Prisma.UserTokenListRelationFilter> = z.object({
  every: z.lazy(() => UserTokenWhereInputSchema).optional(),
  some: z.lazy(() => UserTokenWhereInputSchema).optional(),
  none: z.lazy(() => UserTokenWhereInputSchema).optional()
}).strict();

export const TransactionListRelationFilterSchema: z.ZodType<Prisma.TransactionListRelationFilter> = z.object({
  every: z.lazy(() => TransactionWhereInputSchema).optional(),
  some: z.lazy(() => TransactionWhereInputSchema).optional(),
  none: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const JobListRelationFilterSchema: z.ZodType<Prisma.JobListRelationFilter> = z.object({
  every: z.lazy(() => JobWhereInputSchema).optional(),
  some: z.lazy(() => JobWhereInputSchema).optional(),
  none: z.lazy(() => JobWhereInputSchema).optional()
}).strict();

export const FileListRelationFilterSchema: z.ZodType<Prisma.FileListRelationFilter> = z.object({
  every: z.lazy(() => FileWhereInputSchema).optional(),
  some: z.lazy(() => FileWhereInputSchema).optional(),
  none: z.lazy(() => FileWhereInputSchema).optional()
}).strict();

export const BankListRelationFilterSchema: z.ZodType<Prisma.BankListRelationFilter> = z.object({
  every: z.lazy(() => BankWhereInputSchema).optional(),
  some: z.lazy(() => BankWhereInputSchema).optional(),
  none: z.lazy(() => BankWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BankOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.TokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.TokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TokenRelationFilterSchema: z.ZodType<Prisma.TokenRelationFilter> = z.object({
  is: z.lazy(() => TokenWhereInputSchema).optional(),
  isNot: z.lazy(() => TokenWhereInputSchema).optional()
}).strict();

export const UserTokenUserIdTokenIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserTokenUserIdTokenIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  tokenId: z.string()
}).strict();

export const UserTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const FileUserIdPathNameCompoundUniqueInputSchema: z.ZodType<Prisma.FileUserIdPathNameCompoundUniqueInput> = z.object({
  userId: z.string(),
  path: z.string(),
  name: z.string()
}).strict();

export const FileCountOrderByAggregateInputSchema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FileAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMinOrderByAggregateInputSchema: z.ZodType<Prisma.FileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  mime: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileSumOrderByAggregateInputSchema: z.ZodType<Prisma.FileSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  ttl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const TranslationLocaleHashCompoundUniqueInputSchema: z.ZodType<Prisma.TranslationLocaleHashCompoundUniqueInput> = z.object({
  locale: z.string(),
  hash: z.string()
}).strict();

export const TranslationCountOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumJobStatusFilterSchema: z.ZodType<Prisma.EnumJobStatusFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const JobLogListRelationFilterSchema: z.ZodType<Prisma.JobLogListRelationFilter> = z.object({
  every: z.lazy(() => JobLogWhereInputSchema).optional(),
  some: z.lazy(() => JobLogWhereInputSchema).optional(),
  none: z.lazy(() => JobLogWhereInputSchema).optional()
}).strict();

export const JobLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  params: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobAvgOrderByAggregateInput> = z.object({
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobSumOrderByAggregateInput> = z.object({
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumJobStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStatusFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const JobRelationFilterSchema: z.ZodType<Prisma.JobRelationFilter> = z.object({
  is: z.lazy(() => JobWhereInputSchema).optional(),
  isNot: z.lazy(() => JobWhereInputSchema).optional()
}).strict();

export const JobLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeywordCountOrderByAggregateInputSchema: z.ZodType<Prisma.KeywordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeywordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KeywordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeywordMinOrderByAggregateInputSchema: z.ZodType<Prisma.KeywordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalNullableFilterSchema: z.ZodType<Prisma.DecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BankUserIdAccountCompoundUniqueInputSchema: z.ZodType<Prisma.BankUserIdAccountCompoundUniqueInput> = z.object({
  userId: z.string(),
  account: z.string()
}).strict();

export const BankCountOrderByAggregateInputSchema: z.ZodType<Prisma.BankCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balanceValue: z.lazy(() => SortOrderSchema).optional(),
  balanceDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BankAvgOrderByAggregateInput> = z.object({
  balanceValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BankMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balanceValue: z.lazy(() => SortOrderSchema).optional(),
  balanceDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankMinOrderByAggregateInputSchema: z.ZodType<Prisma.BankMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balanceValue: z.lazy(() => SortOrderSchema).optional(),
  balanceDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankSumOrderByAggregateInputSchema: z.ZodType<Prisma.BankSumOrderByAggregateInput> = z.object({
  balanceValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional()
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const BankRelationFilterSchema: z.ZodType<Prisma.BankRelationFilter> = z.object({
  is: z.lazy(() => BankWhereInputSchema).optional(),
  isNot: z.lazy(() => BankWhereInputSchema).optional()
}).strict();

export const TransactionUserIdReferenceCompoundUniqueInputSchema: z.ZodType<Prisma.TransactionUserIdReferenceCompoundUniqueInput> = z.object({
  userId: z.string(),
  reference: z.string()
}).strict();

export const TransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionSumOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenCreateWithoutUserInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BankCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenCreateWithoutUserInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BankUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenCreateWithoutUserInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FileUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FileUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BankUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BankUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenCreateWithoutUserInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobCreateWithoutUserInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => JobUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BankUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BankUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTokenCreateNestedManyWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateNestedManyWithoutTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUncheckedCreateNestedManyWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateNestedManyWithoutTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUpdateManyWithoutTokenNestedInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithoutTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTokenUncheckedUpdateManyWithoutTokenNestedInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateManyWithoutTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserTokenInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TokenCreateNestedOneWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenCreateNestedOneWithoutUserTokenInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TokenCreateOrConnectWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => TokenWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserTokenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTokenInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTokenInputSchema) ]).optional(),
}).strict();

export const TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema: z.ZodType<Prisma.TokenUpdateOneRequiredWithoutUserTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TokenCreateOrConnectWithoutUserTokenInputSchema).optional(),
  upsert: z.lazy(() => TokenUpsertWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => TokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TokenUpdateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserTokenInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneWithoutFileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFileInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutJobInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const JobLogCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.JobLogCreateNestedManyWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobLogUncheckedCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateNestedManyWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumJobStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JobStatusSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneWithoutJobNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutJobInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutJobInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobInputSchema) ]).optional(),
}).strict();

export const JobLogUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.JobLogUpdateManyWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema),z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobLogUncheckedUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateManyWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogCreateWithoutJobInputSchema).array(),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema),z.lazy(() => JobLogCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpsertWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobLogCreateManyJobInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobLogWhereUniqueInputSchema),z.lazy(() => JobLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema),z.lazy(() => JobLogUpdateWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema),z.lazy(() => JobLogUpdateManyWithWhereWithoutJobInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobCreateNestedOneWithoutLogsInputSchema: z.ZodType<Prisma.JobCreateNestedOneWithoutLogsInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobCreateOrConnectWithoutLogsInputSchema).optional(),
  connect: z.lazy(() => JobWhereUniqueInputSchema).optional()
}).strict();

export const JobUpdateOneRequiredWithoutLogsNestedInputSchema: z.ZodType<Prisma.JobUpdateOneRequiredWithoutLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobCreateOrConnectWithoutLogsInputSchema).optional(),
  upsert: z.lazy(() => JobUpsertWithoutLogsInputSchema).optional(),
  connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithoutLogsInputSchema),z.lazy(() => JobUncheckedUpdateWithoutLogsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBankInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBankInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TransactionCreateNestedManyWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutBankInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutBankInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutBankInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const UserUpdateOneRequiredWithoutBankNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBankNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBankInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutBankInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBankInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutBankNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutBankNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutBankNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutBankNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BankCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => BankWhereUniqueInputSchema).optional()
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTransactionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export const BankUpdateOneRequiredWithoutTransactionNestedInputSchema: z.ZodType<Prisma.BankUpdateOneRequiredWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => BankUpsertWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => BankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BankUpdateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumJobStatusFilterSchema: z.ZodType<Prisma.NestedEnumJobStatusFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumJobStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobStatusSchema).optional(),
  in: z.lazy(() => JobStatusSchema).array().optional(),
  notIn: z.lazy(() => JobStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => NestedEnumJobStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStatusFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalNullableFilterSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional()
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.lazy(() => TokenCreateNestedOneWithoutUserTokenInputSchema)
}).strict();

export const UserTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  tokenId: z.string()
}).strict();

export const UserTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTokenCreateManyUserInputSchema),z.lazy(() => UserTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionCreateWithoutUserInputSchema: z.ZodType<Prisma.TransactionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  reference: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  bank: z.lazy(() => BankCreateNestedOneWithoutTransactionInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  reference: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const TransactionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TransactionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyUserInputSchema),z.lazy(() => TransactionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JobCreateWithoutUserInputSchema: z.ZodType<Prisma.JobCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().optional(),
  progress: z.number().optional(),
  success: z.number().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().optional(),
  progress: z.number().optional(),
  success: z.number().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogUncheckedCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const JobCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.JobCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobCreateManyUserInputSchema),z.lazy(() => JobCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FileCreateWithoutUserInputSchema: z.ZodType<Prisma.FileCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number(),
  location: z.string(),
  ttl: z.number().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable()
}).strict();

export const FileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number(),
  location: z.string(),
  ttl: z.number().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable()
}).strict();

export const FileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FileCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FileCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FileCreateManyUserInputSchema),z.lazy(() => FileCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BankCreateWithoutUserInputSchema: z.ZodType<Prisma.BankCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutBankInputSchema).optional()
}).strict();

export const BankUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BankUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutBankInputSchema).optional()
}).strict();

export const BankCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BankCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BankCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BankCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BankCreateManyUserInputSchema),z.lazy(() => BankCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTokenUpdateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateManyMutationInputSchema),z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema) ]),
}).strict();

export const UserTokenScalarWhereInputSchema: z.ZodType<Prisma.UserTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export const TransactionScalarWhereInputSchema: z.ZodType<Prisma.TransactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reference: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bankId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  variable: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  static: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  target: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const JobUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobUpdateWithoutUserInputSchema),z.lazy(() => JobUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => JobCreateWithoutUserInputSchema),z.lazy(() => JobUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const JobUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobUpdateWithoutUserInputSchema),z.lazy(() => JobUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const JobUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.JobUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => JobScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobUpdateManyMutationInputSchema),z.lazy(() => JobUncheckedUpdateManyWithoutJobInputSchema) ]),
}).strict();

export const JobScalarWhereInputSchema: z.ZodType<Prisma.JobScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumJobStatusFilterSchema),z.lazy(() => JobStatusSchema) ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  progress: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  success: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  successRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  failure: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  failureRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  skip: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  skipRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  params: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const FileUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FileUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FileUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FileUpdateManyMutationInputSchema),z.lazy(() => FileUncheckedUpdateManyWithoutFileInputSchema) ]),
}).strict();

export const FileScalarWhereInputSchema: z.ZodType<Prisma.FileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ttl: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const BankUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BankUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BankUpdateWithoutUserInputSchema),z.lazy(() => BankUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BankUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BankUpdateWithoutUserInputSchema),z.lazy(() => BankUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BankUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BankScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BankUpdateManyMutationInputSchema),z.lazy(() => BankUncheckedUpdateManyWithoutBankInputSchema) ]),
}).strict();

export const BankScalarWhereInputSchema: z.ZodType<Prisma.BankScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balanceValue: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  balanceDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserTokenCreateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateWithoutTokenInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTokenInputSchema)
}).strict();

export const UserTokenUncheckedCreateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedCreateWithoutTokenInput> = z.object({
  id: z.string().optional(),
  userId: z.string()
}).strict();

export const UserTokenCreateOrConnectWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateOrConnectWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema) ]),
}).strict();

export const UserTokenCreateManyTokenInputEnvelopeSchema: z.ZodType<Prisma.UserTokenCreateManyTokenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTokenCreateManyTokenInputSchema),z.lazy(() => UserTokenCreateManyTokenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpsertWithWhereUniqueWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTokenUpdateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema) ]),
}).strict();

export const UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateWithWhereUniqueWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutTokenInputSchema) ]),
}).strict();

export const UserTokenUpdateManyWithWhereWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithWhereWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateManyMutationInputSchema),z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema) ]),
}).strict();

export const UserCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.UserCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserTokenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserTokenInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export const TokenCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const TokenUncheckedCreateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUncheckedCreateWithoutUserTokenInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const TokenCreateOrConnectWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenCreateOrConnectWithoutUserTokenInput> = z.object({
  where: z.lazy(() => TokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export const UserUpsertWithoutUserTokenInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserTokenInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserTokenInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserTokenInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TokenUpsertWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUpsertWithoutUserTokenInput> = z.object({
  update: z.union([ z.lazy(() => TokenUpdateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserTokenInputSchema) ]),
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export const TokenUpdateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUpdateWithoutUserTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TokenUncheckedUpdateWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateWithoutUserTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutFileInputSchema: z.ZodType<Prisma.UserCreateWithoutFileInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFileInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export const UserUpsertWithoutFileInputSchema: z.ZodType<Prisma.UserUpsertWithoutFileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export const UserUpdateWithoutFileInputSchema: z.ZodType<Prisma.UserUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutJobInputSchema: z.ZodType<Prisma.UserCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutJobInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const JobLogCreateWithoutJobInputSchema: z.ZodType<Prisma.JobLogCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  message: z.string()
}).strict();

export const JobLogUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  message: z.string()
}).strict();

export const JobLogCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.JobLogCreateOrConnectWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const JobLogCreateManyJobInputEnvelopeSchema: z.ZodType<Prisma.JobLogCreateManyJobInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobLogCreateManyJobInputSchema),z.lazy(() => JobLogCreateManyJobInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutJobInputSchema: z.ZodType<Prisma.UserUpsertWithoutJobInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutJobInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const UserUpdateWithoutJobInputSchema: z.ZodType<Prisma.UserUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutJobInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const JobLogUpsertWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpsertWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobLogUpdateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedUpdateWithoutJobInputSchema) ]),
  create: z.union([ z.lazy(() => JobLogCreateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const JobLogUpdateWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpdateWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobLogUpdateWithoutJobInputSchema),z.lazy(() => JobLogUncheckedUpdateWithoutJobInputSchema) ]),
}).strict();

export const JobLogUpdateManyWithWhereWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpdateManyWithWhereWithoutJobInput> = z.object({
  where: z.lazy(() => JobLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobLogUpdateManyMutationInputSchema),z.lazy(() => JobLogUncheckedUpdateManyWithoutLogsInputSchema) ]),
}).strict();

export const JobLogScalarWhereInputSchema: z.ZodType<Prisma.JobLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobLogScalarWhereInputSchema),z.lazy(() => JobLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const JobCreateWithoutLogsInputSchema: z.ZodType<Prisma.JobCreateWithoutLogsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().optional(),
  progress: z.number().optional(),
  success: z.number().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobInputSchema).optional()
}).strict();

export const JobUncheckedCreateWithoutLogsInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutLogsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().optional(),
  progress: z.number().optional(),
  success: z.number().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const JobCreateOrConnectWithoutLogsInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutLogsInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]),
}).strict();

export const JobUpsertWithoutLogsInputSchema: z.ZodType<Prisma.JobUpsertWithoutLogsInput> = z.object({
  update: z.union([ z.lazy(() => JobUpdateWithoutLogsInputSchema),z.lazy(() => JobUncheckedUpdateWithoutLogsInputSchema) ]),
  create: z.union([ z.lazy(() => JobCreateWithoutLogsInputSchema),z.lazy(() => JobUncheckedCreateWithoutLogsInputSchema) ]),
}).strict();

export const JobUpdateWithoutLogsInputSchema: z.ZodType<Prisma.JobUpdateWithoutLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateWithoutLogsInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const UserCreateWithoutBankInputSchema: z.ZodType<Prisma.UserCreateWithoutBankInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBankInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBankInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBankInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBankInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export const TransactionCreateWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateWithoutBankInput> = z.object({
  id: z.string().optional(),
  reference: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTransactionInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutBankInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutBankInput> = z.object({
  id: z.string().optional(),
  reference: z.string(),
  userId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const TransactionCreateOrConnectWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export const TransactionCreateManyBankInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyBankInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyBankInputSchema),z.lazy(() => TransactionCreateManyBankInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutBankInputSchema: z.ZodType<Prisma.UserUpsertWithoutBankInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBankInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBankInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export const UserUpdateWithoutBankInputSchema: z.ZodType<Prisma.UserUpdateWithoutBankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBankInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutBankInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutBankInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export const UserCreateWithoutTransactionInputSchema: z.ZodType<Prisma.UserCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const BankCreateWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankInputSchema)
}).strict();

export const BankUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.BankUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable()
}).strict();

export const BankCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const UserUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.UserUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const UserUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.UserUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BankUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.BankUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => BankUpdateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const BankUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.BankUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBankNestedInputSchema).optional()
}).strict();

export const BankUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.BankUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const UserTokenCreateManyUserInputSchema: z.ZodType<Prisma.UserTokenCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  tokenId: z.string()
}).strict();

export const TransactionCreateManyUserInputSchema: z.ZodType<Prisma.TransactionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  bankId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const JobCreateManyUserInputSchema: z.ZodType<Prisma.JobCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
  success: z.number().int().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().int().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().int().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const FileCreateManyUserInputSchema: z.ZodType<Prisma.FileCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable()
}).strict();

export const BankCreateManyUserInputSchema: z.ZodType<Prisma.BankCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  account: z.string(),
  description: z.string().optional().nullable(),
  balanceValue: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  balanceDate: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.lazy(() => TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional()
}).strict();

export const UserTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateManyWithoutUserTokenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bank: z.lazy(() => BankUpdateOneRequiredWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  logs: z.lazy(() => JobLogUncheckedUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateManyWithoutJobInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyWithoutJobInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => JobStatusSchema),z.lazy(() => EnumJobStatusFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  success: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  successRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failure: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  failureRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skip: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skipRatio: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  params: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const FileUpdateWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileUncheckedUpdateManyWithoutFileInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutFileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ttl: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BankUpdateWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export const BankUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BankUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export const BankUncheckedUpdateManyWithoutBankInputSchema: z.ZodType<Prisma.BankUncheckedUpdateManyWithoutBankInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceValue: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balanceDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserTokenCreateManyTokenInputSchema: z.ZodType<Prisma.UserTokenCreateManyTokenInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export const UserTokenUpdateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateWithoutTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional()
}).strict();

export const UserTokenUncheckedUpdateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateWithoutTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobLogCreateManyJobInputSchema: z.ZodType<Prisma.JobLogCreateManyJobInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string()
}).strict();

export const JobLogUpdateWithoutJobInputSchema: z.ZodType<Prisma.JobLogUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobLogUncheckedUpdateWithoutJobInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobLogUncheckedUpdateManyWithoutLogsInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateManyWithoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyBankInputSchema: z.ZodType<Prisma.TransactionCreateManyBankInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  userId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export const TransactionUpdateWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutBankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutBankInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutBankInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reference: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  variable: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  static: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const TokenFindFirstArgsSchema: z.ZodType<Prisma.TokenFindFirstArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const TokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TokenFindFirstOrThrowArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const TokenFindManyArgsSchema: z.ZodType<Prisma.TokenFindManyArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const TokenAggregateArgsSchema: z.ZodType<Prisma.TokenAggregateArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithRelationInputSchema.array(),TokenOrderByWithRelationInputSchema ]).optional(),
  cursor: TokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TokenGroupByArgsSchema: z.ZodType<Prisma.TokenGroupByArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
  orderBy: z.union([ TokenOrderByWithAggregationInputSchema.array(),TokenOrderByWithAggregationInputSchema ]).optional(),
  by: TokenScalarFieldEnumSchema.array(),
  having: TokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TokenFindUniqueArgsSchema: z.ZodType<Prisma.TokenFindUniqueArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict()

export const TokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TokenFindUniqueOrThrowArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict()

export const UserTokenFindFirstArgsSchema: z.ZodType<Prisma.UserTokenFindFirstArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserTokenFindFirstOrThrowArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTokenFindManyArgsSchema: z.ZodType<Prisma.UserTokenFindManyArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTokenAggregateArgsSchema: z.ZodType<Prisma.UserTokenAggregateArgs> = z.object({
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithRelationInputSchema.array(),UserTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserTokenGroupByArgsSchema: z.ZodType<Prisma.UserTokenGroupByArgs> = z.object({
  where: UserTokenWhereInputSchema.optional(),
  orderBy: z.union([ UserTokenOrderByWithAggregationInputSchema.array(),UserTokenOrderByWithAggregationInputSchema ]).optional(),
  by: UserTokenScalarFieldEnumSchema.array(),
  having: UserTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserTokenFindUniqueArgsSchema: z.ZodType<Prisma.UserTokenFindUniqueArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereUniqueInputSchema,
}).strict()

export const UserTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserTokenFindUniqueOrThrowArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereUniqueInputSchema,
}).strict()

export const FileFindFirstArgsSchema: z.ZodType<Prisma.FileFindFirstArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FileScalarFieldEnumSchema.array().optional(),
}).strict()

export const FileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FileFindFirstOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FileScalarFieldEnumSchema.array().optional(),
}).strict()

export const FileFindManyArgsSchema: z.ZodType<Prisma.FileFindManyArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FileScalarFieldEnumSchema.array().optional(),
}).strict()

export const FileAggregateArgsSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FileGroupByArgsSchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithAggregationInputSchema.array(),FileOrderByWithAggregationInputSchema ]).optional(),
  by: FileScalarFieldEnumSchema.array(),
  having: FileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FileFindUniqueArgsSchema: z.ZodType<Prisma.FileFindUniqueArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FileFindUniqueOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const TranslationFindFirstArgsSchema: z.ZodType<Prisma.TranslationFindFirstArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TranslationScalarFieldEnumSchema.array().optional(),
}).strict()

export const TranslationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindFirstOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TranslationScalarFieldEnumSchema.array().optional(),
}).strict()

export const TranslationFindManyArgsSchema: z.ZodType<Prisma.TranslationFindManyArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TranslationScalarFieldEnumSchema.array().optional(),
}).strict()

export const TranslationAggregateArgsSchema: z.ZodType<Prisma.TranslationAggregateArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranslationGroupByArgsSchema: z.ZodType<Prisma.TranslationGroupByArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithAggregationInputSchema.array(),TranslationOrderByWithAggregationInputSchema ]).optional(),
  by: TranslationScalarFieldEnumSchema.array(),
  having: TranslationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranslationFindUniqueArgsSchema: z.ZodType<Prisma.TranslationFindUniqueArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindUniqueOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const JobFindFirstArgsSchema: z.ZodType<Prisma.JobFindFirstArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobFindFirstOrThrowArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobFindManyArgsSchema: z.ZodType<Prisma.JobFindManyArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobAggregateArgsSchema: z.ZodType<Prisma.JobAggregateArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobGroupByArgsSchema: z.ZodType<Prisma.JobGroupByArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithAggregationInputSchema.array(),JobOrderByWithAggregationInputSchema ]).optional(),
  by: JobScalarFieldEnumSchema.array(),
  having: JobScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobFindUniqueArgsSchema: z.ZodType<Prisma.JobFindUniqueArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobFindUniqueOrThrowArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobLogFindFirstArgsSchema: z.ZodType<Prisma.JobLogFindFirstArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithRelationInputSchema.array(),JobLogOrderByWithRelationInputSchema ]).optional(),
  cursor: JobLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobLogScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobLogFindFirstOrThrowArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithRelationInputSchema.array(),JobLogOrderByWithRelationInputSchema ]).optional(),
  cursor: JobLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobLogScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobLogFindManyArgsSchema: z.ZodType<Prisma.JobLogFindManyArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithRelationInputSchema.array(),JobLogOrderByWithRelationInputSchema ]).optional(),
  cursor: JobLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobLogScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobLogAggregateArgsSchema: z.ZodType<Prisma.JobLogAggregateArgs> = z.object({
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithRelationInputSchema.array(),JobLogOrderByWithRelationInputSchema ]).optional(),
  cursor: JobLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobLogGroupByArgsSchema: z.ZodType<Prisma.JobLogGroupByArgs> = z.object({
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithAggregationInputSchema.array(),JobLogOrderByWithAggregationInputSchema ]).optional(),
  by: JobLogScalarFieldEnumSchema.array(),
  having: JobLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobLogFindUniqueArgsSchema: z.ZodType<Prisma.JobLogFindUniqueArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereUniqueInputSchema,
}).strict()

export const JobLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobLogFindUniqueOrThrowArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereUniqueInputSchema,
}).strict()

export const KeywordFindFirstArgsSchema: z.ZodType<Prisma.KeywordFindFirstArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KeywordScalarFieldEnumSchema.array().optional(),
}).strict()

export const KeywordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KeywordFindFirstOrThrowArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KeywordScalarFieldEnumSchema.array().optional(),
}).strict()

export const KeywordFindManyArgsSchema: z.ZodType<Prisma.KeywordFindManyArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: KeywordScalarFieldEnumSchema.array().optional(),
}).strict()

export const KeywordAggregateArgsSchema: z.ZodType<Prisma.KeywordAggregateArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithRelationInputSchema.array(),KeywordOrderByWithRelationInputSchema ]).optional(),
  cursor: KeywordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KeywordGroupByArgsSchema: z.ZodType<Prisma.KeywordGroupByArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
  orderBy: z.union([ KeywordOrderByWithAggregationInputSchema.array(),KeywordOrderByWithAggregationInputSchema ]).optional(),
  by: KeywordScalarFieldEnumSchema.array(),
  having: KeywordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KeywordFindUniqueArgsSchema: z.ZodType<Prisma.KeywordFindUniqueArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
}).strict()

export const KeywordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KeywordFindUniqueOrThrowArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
}).strict()

export const BankFindFirstArgsSchema: z.ZodType<Prisma.BankFindFirstArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BankScalarFieldEnumSchema.array().optional(),
}).strict()

export const BankFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BankFindFirstOrThrowArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BankScalarFieldEnumSchema.array().optional(),
}).strict()

export const BankFindManyArgsSchema: z.ZodType<Prisma.BankFindManyArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: BankScalarFieldEnumSchema.array().optional(),
}).strict()

export const BankAggregateArgsSchema: z.ZodType<Prisma.BankAggregateArgs> = z.object({
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithRelationInputSchema.array(),BankOrderByWithRelationInputSchema ]).optional(),
  cursor: BankWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BankGroupByArgsSchema: z.ZodType<Prisma.BankGroupByArgs> = z.object({
  where: BankWhereInputSchema.optional(),
  orderBy: z.union([ BankOrderByWithAggregationInputSchema.array(),BankOrderByWithAggregationInputSchema ]).optional(),
  by: BankScalarFieldEnumSchema.array(),
  having: BankScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const BankFindUniqueArgsSchema: z.ZodType<Prisma.BankFindUniqueArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereUniqueInputSchema,
}).strict()

export const BankFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BankFindUniqueOrThrowArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereUniqueInputSchema,
}).strict()

export const TransactionFindFirstArgsSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TransactionScalarFieldEnumSchema.array().optional(),
}).strict()

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TransactionScalarFieldEnumSchema.array().optional(),
}).strict()

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TransactionScalarFieldEnumSchema.array().optional(),
}).strict()

export const TransactionAggregateArgsSchema: z.ZodType<Prisma.TransactionAggregateArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionGroupByArgsSchema: z.ZodType<Prisma.TransactionGroupByArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithAggregationInputSchema.array(),TransactionOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionScalarFieldEnumSchema.array(),
  having: TransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindUniqueOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const TokenCreateArgsSchema: z.ZodType<Prisma.TokenCreateArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  data: z.union([ TokenCreateInputSchema,TokenUncheckedCreateInputSchema ]),
}).strict()

export const TokenUpsertArgsSchema: z.ZodType<Prisma.TokenUpsertArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
  create: z.union([ TokenCreateInputSchema,TokenUncheckedCreateInputSchema ]),
  update: z.union([ TokenUpdateInputSchema,TokenUncheckedUpdateInputSchema ]),
}).strict()

export const TokenCreateManyArgsSchema: z.ZodType<Prisma.TokenCreateManyArgs> = z.object({
  data: z.union([ TokenCreateManyInputSchema,TokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TokenDeleteArgsSchema: z.ZodType<Prisma.TokenDeleteArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  where: TokenWhereUniqueInputSchema,
}).strict()

export const TokenUpdateArgsSchema: z.ZodType<Prisma.TokenUpdateArgs> = z.object({
  select: TokenSelectSchema.optional(),
  include: TokenIncludeSchema.optional(),
  data: z.union([ TokenUpdateInputSchema,TokenUncheckedUpdateInputSchema ]),
  where: TokenWhereUniqueInputSchema,
}).strict()

export const TokenUpdateManyArgsSchema: z.ZodType<Prisma.TokenUpdateManyArgs> = z.object({
  data: z.union([ TokenUpdateManyMutationInputSchema,TokenUncheckedUpdateManyInputSchema ]),
  where: TokenWhereInputSchema.optional(),
}).strict()

export const TokenDeleteManyArgsSchema: z.ZodType<Prisma.TokenDeleteManyArgs> = z.object({
  where: TokenWhereInputSchema.optional(),
}).strict()

export const UserTokenCreateArgsSchema: z.ZodType<Prisma.UserTokenCreateArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  data: z.union([ UserTokenCreateInputSchema,UserTokenUncheckedCreateInputSchema ]),
}).strict()

export const UserTokenUpsertArgsSchema: z.ZodType<Prisma.UserTokenUpsertArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereUniqueInputSchema,
  create: z.union([ UserTokenCreateInputSchema,UserTokenUncheckedCreateInputSchema ]),
  update: z.union([ UserTokenUpdateInputSchema,UserTokenUncheckedUpdateInputSchema ]),
}).strict()

export const UserTokenCreateManyArgsSchema: z.ZodType<Prisma.UserTokenCreateManyArgs> = z.object({
  data: z.union([ UserTokenCreateManyInputSchema,UserTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserTokenDeleteArgsSchema: z.ZodType<Prisma.UserTokenDeleteArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  where: UserTokenWhereUniqueInputSchema,
}).strict()

export const UserTokenUpdateArgsSchema: z.ZodType<Prisma.UserTokenUpdateArgs> = z.object({
  select: UserTokenSelectSchema.optional(),
  include: UserTokenIncludeSchema.optional(),
  data: z.union([ UserTokenUpdateInputSchema,UserTokenUncheckedUpdateInputSchema ]),
  where: UserTokenWhereUniqueInputSchema,
}).strict()

export const UserTokenUpdateManyArgsSchema: z.ZodType<Prisma.UserTokenUpdateManyArgs> = z.object({
  data: z.union([ UserTokenUpdateManyMutationInputSchema,UserTokenUncheckedUpdateManyInputSchema ]),
  where: UserTokenWhereInputSchema.optional(),
}).strict()

export const UserTokenDeleteManyArgsSchema: z.ZodType<Prisma.UserTokenDeleteManyArgs> = z.object({
  where: UserTokenWhereInputSchema.optional(),
}).strict()

export const FileCreateArgsSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
}).strict()

export const FileUpsertArgsSchema: z.ZodType<Prisma.FileUpsertArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  create: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
  update: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
}).strict()

export const FileCreateManyArgsSchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FileDeleteArgsSchema: z.ZodType<Prisma.FileDeleteArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileUpdateArgsSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  where: FileWhereUniqueInputSchema,
}).strict()

export const FileUpdateManyArgsSchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict()

export const FileDeleteManyArgsSchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({
  where: FileWhereInputSchema.optional(),
}).strict()

export const TranslationCreateArgsSchema: z.ZodType<Prisma.TranslationCreateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  data: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
}).strict()

export const TranslationUpsertArgsSchema: z.ZodType<Prisma.TranslationUpsertArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
  create: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
  update: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
}).strict()

export const TranslationCreateManyArgsSchema: z.ZodType<Prisma.TranslationCreateManyArgs> = z.object({
  data: z.union([ TranslationCreateManyInputSchema,TranslationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TranslationDeleteArgsSchema: z.ZodType<Prisma.TranslationDeleteArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationUpdateArgsSchema: z.ZodType<Prisma.TranslationUpdateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  data: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationUpdateManyArgsSchema: z.ZodType<Prisma.TranslationUpdateManyArgs> = z.object({
  data: z.union([ TranslationUpdateManyMutationInputSchema,TranslationUncheckedUpdateManyInputSchema ]),
  where: TranslationWhereInputSchema.optional(),
}).strict()

export const TranslationDeleteManyArgsSchema: z.ZodType<Prisma.TranslationDeleteManyArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
}).strict()

export const JobCreateArgsSchema: z.ZodType<Prisma.JobCreateArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  data: z.union([ JobCreateInputSchema,JobUncheckedCreateInputSchema ]),
}).strict()

export const JobUpsertArgsSchema: z.ZodType<Prisma.JobUpsertArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
  create: z.union([ JobCreateInputSchema,JobUncheckedCreateInputSchema ]),
  update: z.union([ JobUpdateInputSchema,JobUncheckedUpdateInputSchema ]),
}).strict()

export const JobCreateManyArgsSchema: z.ZodType<Prisma.JobCreateManyArgs> = z.object({
  data: z.union([ JobCreateManyInputSchema,JobCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const JobDeleteArgsSchema: z.ZodType<Prisma.JobDeleteArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobUpdateArgsSchema: z.ZodType<Prisma.JobUpdateArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  data: z.union([ JobUpdateInputSchema,JobUncheckedUpdateInputSchema ]),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobUpdateManyArgsSchema: z.ZodType<Prisma.JobUpdateManyArgs> = z.object({
  data: z.union([ JobUpdateManyMutationInputSchema,JobUncheckedUpdateManyInputSchema ]),
  where: JobWhereInputSchema.optional(),
}).strict()

export const JobDeleteManyArgsSchema: z.ZodType<Prisma.JobDeleteManyArgs> = z.object({
  where: JobWhereInputSchema.optional(),
}).strict()

export const JobLogCreateArgsSchema: z.ZodType<Prisma.JobLogCreateArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  data: z.union([ JobLogCreateInputSchema,JobLogUncheckedCreateInputSchema ]),
}).strict()

export const JobLogUpsertArgsSchema: z.ZodType<Prisma.JobLogUpsertArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereUniqueInputSchema,
  create: z.union([ JobLogCreateInputSchema,JobLogUncheckedCreateInputSchema ]),
  update: z.union([ JobLogUpdateInputSchema,JobLogUncheckedUpdateInputSchema ]),
}).strict()

export const JobLogCreateManyArgsSchema: z.ZodType<Prisma.JobLogCreateManyArgs> = z.object({
  data: z.union([ JobLogCreateManyInputSchema,JobLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const JobLogDeleteArgsSchema: z.ZodType<Prisma.JobLogDeleteArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereUniqueInputSchema,
}).strict()

export const JobLogUpdateArgsSchema: z.ZodType<Prisma.JobLogUpdateArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  data: z.union([ JobLogUpdateInputSchema,JobLogUncheckedUpdateInputSchema ]),
  where: JobLogWhereUniqueInputSchema,
}).strict()

export const JobLogUpdateManyArgsSchema: z.ZodType<Prisma.JobLogUpdateManyArgs> = z.object({
  data: z.union([ JobLogUpdateManyMutationInputSchema,JobLogUncheckedUpdateManyInputSchema ]),
  where: JobLogWhereInputSchema.optional(),
}).strict()

export const JobLogDeleteManyArgsSchema: z.ZodType<Prisma.JobLogDeleteManyArgs> = z.object({
  where: JobLogWhereInputSchema.optional(),
}).strict()

export const KeywordCreateArgsSchema: z.ZodType<Prisma.KeywordCreateArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  data: z.union([ KeywordCreateInputSchema,KeywordUncheckedCreateInputSchema ]),
}).strict()

export const KeywordUpsertArgsSchema: z.ZodType<Prisma.KeywordUpsertArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
  create: z.union([ KeywordCreateInputSchema,KeywordUncheckedCreateInputSchema ]),
  update: z.union([ KeywordUpdateInputSchema,KeywordUncheckedUpdateInputSchema ]),
}).strict()

export const KeywordCreateManyArgsSchema: z.ZodType<Prisma.KeywordCreateManyArgs> = z.object({
  data: z.union([ KeywordCreateManyInputSchema,KeywordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const KeywordDeleteArgsSchema: z.ZodType<Prisma.KeywordDeleteArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  where: KeywordWhereUniqueInputSchema,
}).strict()

export const KeywordUpdateArgsSchema: z.ZodType<Prisma.KeywordUpdateArgs> = z.object({
  select: KeywordSelectSchema.optional(),
  data: z.union([ KeywordUpdateInputSchema,KeywordUncheckedUpdateInputSchema ]),
  where: KeywordWhereUniqueInputSchema,
}).strict()

export const KeywordUpdateManyArgsSchema: z.ZodType<Prisma.KeywordUpdateManyArgs> = z.object({
  data: z.union([ KeywordUpdateManyMutationInputSchema,KeywordUncheckedUpdateManyInputSchema ]),
  where: KeywordWhereInputSchema.optional(),
}).strict()

export const KeywordDeleteManyArgsSchema: z.ZodType<Prisma.KeywordDeleteManyArgs> = z.object({
  where: KeywordWhereInputSchema.optional(),
}).strict()

export const BankCreateArgsSchema: z.ZodType<Prisma.BankCreateArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  data: z.union([ BankCreateInputSchema,BankUncheckedCreateInputSchema ]),
}).strict()

export const BankUpsertArgsSchema: z.ZodType<Prisma.BankUpsertArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereUniqueInputSchema,
  create: z.union([ BankCreateInputSchema,BankUncheckedCreateInputSchema ]),
  update: z.union([ BankUpdateInputSchema,BankUncheckedUpdateInputSchema ]),
}).strict()

export const BankCreateManyArgsSchema: z.ZodType<Prisma.BankCreateManyArgs> = z.object({
  data: z.union([ BankCreateManyInputSchema,BankCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const BankDeleteArgsSchema: z.ZodType<Prisma.BankDeleteArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  where: BankWhereUniqueInputSchema,
}).strict()

export const BankUpdateArgsSchema: z.ZodType<Prisma.BankUpdateArgs> = z.object({
  select: BankSelectSchema.optional(),
  include: BankIncludeSchema.optional(),
  data: z.union([ BankUpdateInputSchema,BankUncheckedUpdateInputSchema ]),
  where: BankWhereUniqueInputSchema,
}).strict()

export const BankUpdateManyArgsSchema: z.ZodType<Prisma.BankUpdateManyArgs> = z.object({
  data: z.union([ BankUpdateManyMutationInputSchema,BankUncheckedUpdateManyInputSchema ]),
  where: BankWhereInputSchema.optional(),
}).strict()

export const BankDeleteManyArgsSchema: z.ZodType<Prisma.BankDeleteManyArgs> = z.object({
  where: BankWhereInputSchema.optional(),
}).strict()

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict()

export const TransactionUpsertArgsSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
  create: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
  update: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
}).strict()

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TransactionDeleteArgsSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateArgsSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateManyArgsSchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({
  data: z.union([ TransactionUpdateManyMutationInputSchema,TransactionUncheckedUpdateManyInputSchema ]),
  where: TransactionWhereInputSchema.optional(),
}).strict()

export const TransactionDeleteManyArgsSchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
}).strict()