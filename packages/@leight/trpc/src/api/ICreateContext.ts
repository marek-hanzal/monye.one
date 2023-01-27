import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type IContext } from "./IContext";

export type ICreateContext<TContext extends IContext> = (
    options: CreateNextContextOptions
) => Promise<TContext>;
