import {
    type IGeneratorClientFormParams,
    type IGeneratorClientSourceParams
} from "../generator";

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
    Form?: IGeneratorClientFormParams;
}

export const withClientSourceGeneratorsEntity = ({name, disabled = [], packages, withTrpc, Form}: IWithClientSourceGeneratorsEntityProps): IGeneratorClientSourceParams => {
    return {
        SourceProvider: {
            entities: [
                {
                    name,
                    packages,
                    withTrpc: !!withTrpc,
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
        },
        Form,
        Trpc:           withTrpc ? {
            entities: [
                {name, withTrpc, packages}
            ]
        } : undefined,
    };
};
