import chalk                from "chalk";
import {type ISdkGenerator} from "./api";

export const withSdk = async (generators: ISdkGenerator[], cleanup = 'src/sdk'): Promise<void> => {
    console.log(chalk.yellowBright.bold("Leight SDK Generator"));

    for await (const generator of generators) {
        try {
            await generator();
        } catch (e) {
            if (e instanceof Error && e.message !== "Missing dependencies") {
                console.error(e);
            }
            process.exit(1);
        }
    }

    console.log(chalk.greenBright(`- Done`));
};

export * from "./api";
export * from "./generator";
export * from "./utils";
