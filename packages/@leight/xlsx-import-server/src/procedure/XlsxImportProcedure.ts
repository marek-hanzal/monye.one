import { type IMutationProcedure } from "@leight/trpc";
import { withMutationProcedure } from "@leight/trpc-server";
import { RequestSchema } from "@leight/xlsx-import";

export const XlsxImportProcedure: IMutationProcedure<any, any> =
    withMutationProcedure(RequestSchema, ({ input: { fileId } }) => {
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
    });
