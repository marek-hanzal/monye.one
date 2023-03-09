import { z } from 'zod';

export const JobStatusSchema = z.enum(['NEW','RUNNING','SUCCESS','FAILURE','REVIEW','DONE']);

export type JobStatusType = `${z.infer<typeof JobStatusSchema>}`

export default JobStatusSchema;
