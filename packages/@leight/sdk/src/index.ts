import boxen                from "boxen";
import chalk                from "chalk";
import {type ISdkGenerator} from "./api";

export const withSdk = async (generators: ISdkGenerator[]): Promise<void> => {
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

    for await (const generator of generators) {
        try {
            await generator();
        } catch (e) {
            process.exit(1);
        }
    }

    console.log(chalk.greenBright(`- Done`));
};

export * from "./api";
export * from "./generator";
export * from "./utils";
