import { Context, useContext } from "react";

export function useOptionalContext<TContext>(
    context: Context<TContext | null>
): TContext | null {
    return useContext(context);
}
