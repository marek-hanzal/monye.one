import delay from "delay";
import { ProcedureBuilder } from "@trpc/server";
import { z } from "zod";

export const XlsxImportProcedure = <T extends ProcedureBuilder<any>>(
    procedure: T
) => {
    return procedure
        .input(
            z.object({
                fileId: z.string(),
            })
        )
        .mutation(({ input: { fileId } }) => {
            console.log("Importing", fileId);
            setTimeout(async () => {
                for (let i = 0; i <= 100; i++) {
                    console.log("Step", i);
                    await delay(750);
                }
            }, 0);
            return {
                id: Math.random() * 100,
            };
        });
};
