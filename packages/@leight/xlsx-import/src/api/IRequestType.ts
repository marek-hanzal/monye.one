import { z } from "zod";
import { RequestSchema } from "../schema";

export type IRequestType = z.infer<typeof RequestSchema>;
