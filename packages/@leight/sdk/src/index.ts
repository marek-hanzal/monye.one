import {type IfExtends} from "@leight/utils";
import boxen            from "boxen";
import chalk            from "chalk";

export type ITemplate<TParams = void> = IfExtends<
    {
        name: string;
        file: string;
        barell?: boolean;
    },
    { params: TParams }
>;

export const withSdk = async (generators: (() => Promise<void>)[]): Promise<void> => {
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
        await generator();
    }

    console.log(chalk.greenBright(`- Done`));
};

export * from "./template";
