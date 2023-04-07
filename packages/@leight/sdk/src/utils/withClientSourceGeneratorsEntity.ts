import {type IGeneratorClientSourceParams} from "../generator";

export interface IWithClientSourceGeneratorsEntityProps {
    name: string;
    packages: {
        schema: string;
    };
    withTrpc: {
        path: string;
        package: string;
    };
}

export const withClientSourceGeneratorsEntity = ({name, packages, withTrpc}: IWithClientSourceGeneratorsEntityProps): IGeneratorClientSourceParams => {
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
        SourceTable:    {
            entities: [
                {
                    name,
                    packages,
                }
            ]
        }
    };
};
