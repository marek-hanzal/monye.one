import { publicProcedure } from "../../router";
import delay from "delay";

export const XlsxRouter = publicProcedure.mutation(async () => {
    setTimeout(async () => {
        for (let i = 0; i <= 100; i++) {
            console.log("Step", i);
            await delay(750);
        }
    }, 0);
});
