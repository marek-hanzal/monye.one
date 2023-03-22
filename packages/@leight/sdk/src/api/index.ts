import {type IfExtends} from "@leight/utils";

export type ITemplate<TParams = void> = IfExtends<
    {
        /**
         * Package name where SDK is generated (name of your app or monorepo library name (like @myapp/model))
         */
        packageName: string;
        /**
         * Name of the generator, could be basically anything
         */
        name: string;
        /**
         * Where to put generated content
         */
        file: string;
        /**
         * Should also index.ts be generated/updated?
         */
        barrel: boolean;
    },
    { params: TParams }
>;

export interface IGenerator<TParams = void> {
    (props: ITemplate<TParams>): Promise<void>;
}

export interface ISdkGenerator {
    (): Promise<void>;
}
