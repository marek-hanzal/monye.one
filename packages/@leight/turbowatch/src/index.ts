import {watch} from "turbowatch";

export interface IWithTurbowatchProps {
    project: string;
}

export const withTurbowatch = ({project}: IWithTurbowatchProps) => watch({
    project,
    triggers: [
        {
            initialRun: false,
            expression: [
                "anyof",
                [
                    "match",
                    "**/src/**",
                    "wholename"
                ],
                [
                    "match",
                    "*.json",
                    "basename",
                ],
            ],
            name:       "build",
            onChange:   async ({spawn}) => {
                await spawn`npm run build:esbuild`;
                await spawn`npm run build:types`;
            },
        },
    ],
});
