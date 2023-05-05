import {type IfExtends} from "@leight/utils";

export type ITemplate<TParams = void> = IfExtends<
    {
        /**
         * Package name where SDK is generated (name of your app or monorepo library name (like @myapp/model))
         */
        packageName: string;
        /**
         * Precomputed normalized target path
         */
        directory: string;
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

export interface ISdkGeneratorProps {
    /**
     * Package name where the SDK is generated; if not provided, package.json is resolved.
     */
    packageName?: string;
    /**
     * Target folder of the managed source code; it should be dedicated to the generator only.
     */
    folder?: string;
}

export interface ISdkGenerator {
    (): Promise<void>;
}
