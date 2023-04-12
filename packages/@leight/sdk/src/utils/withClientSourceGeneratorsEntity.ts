import {type IGeneratorClientSourceParams} from "../generator";

export interface IWithClientSourceGeneratorsEntityProps {
    name: string;
    packages: {
        schema: string;
    };
    withTrpc?: {
        path: string;
        package: string;
    };
    disabled?: ("table")[];
}

export const withClientSourceGeneratorsEntity = ({name, disabled = [], packages, withTrpc}: IWithClientSourceGeneratorsEntityProps): IGeneratorClientSourceParams => {
    return {
        SourceProvider: {
            entities: [
                {
                    name,
                    packages,
                    withTrpc,
                },
            ],
        },
        SourceStore:    {
            entities: [
                {
                    name,
                    packages,
                },
            ],
        },
        SourceTable:    disabled?.includes("table") ? undefined : {
            entities: [
                {
                    name,
                    packages,
                }
            ]
        }
    };
};
