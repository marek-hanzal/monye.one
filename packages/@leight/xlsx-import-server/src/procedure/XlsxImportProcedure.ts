import { z } from "zod";
import { withMutationProcedure } from "@leight/trpc-server";

export namespace XlsxImportProcedure {
    export const RequestSchema = z.object({
        fileId: z.string(),
    });

    export type RequestType = z.infer<typeof RequestSchema>;

    export const factory = withMutationProcedure(
        RequestSchema,
        ({ input: { fileId } }) => {
            console.log("Importing", fileId);
            setTimeout(async () => {
                for (let i = 0; i <= 100; i++) {
                    console.log("Step", i);
                    // await delay(750);
                }
            }, 0);
            return {
                id: Math.random() * 100,
                foo: true,
            };
        }
    );
}
