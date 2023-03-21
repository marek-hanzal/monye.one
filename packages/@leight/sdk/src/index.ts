import boxen from "boxen";
import chalk from "chalk";
import {z}   from "zod";

export const SdkSchema = z.object({
    name: z.string().min(1),
    file: z.string().min(1),
});
export type ISdkSchema = z.infer<typeof SdkSchema>;

export const withSdk = async (sdk: ISdkSchema[]): Promise<void> => {
    console.log(boxen(
        chalk.yellowBright.inverse.bold("-= -=:    Leight SDK Generator    :=- =-"),
        {
            padding:         1,
            margin:          0,
            borderStyle:     "round",
            borderColor:     "yellow",
            backgroundColor: "black",
        }
    ));

    console.log("Yaaay!", sdk);

    console.log(chalk.greenBright(`- Done`));
};
