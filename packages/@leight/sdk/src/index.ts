import chalk                from "chalk";
import {type ISdkGenerator} from "./api";

export const withSdk = async (generators: ISdkGenerator[]): Promise<void> => {
    console.log(chalk.yellowBright.bold("Leight SDK Generator"));

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
