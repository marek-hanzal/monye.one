import {type IGenerator}               from "../../api";
import {generatorClientSourceProvider} from "./generatorClientSourceProvider";
import {generatorClientSourceStore}    from "./generatorClientSourceStore";
import {generatorClientSourceTable}    from "./generatorClientSourceTable";

export interface IGeneratorClientSourceParams {
    /**
     * Package names used for generating proper `import` statements
     */
    packages: {
        /**
         * Reference to package with generated Schemas (entity/sort/filter/...)
         */
        schema: string;
    };
    trpc?: {
        /**
         * Package (import) of client-side TRPC (should export named trpc)
         */
        package: string;
        /**
         * Part of the trpc call chain (base is `trpc`.${trpcPath}.`...rest of standard trpc router`
         */
        path: string;
    };
    /**
     * Entity name this generator works with
     */
    entity: string;
}

export const generatorClientSource: IGenerator<IGeneratorClientSourceParams> = async props => {
    await Promise.all([
        generatorClientSourceProvider(props),
        generatorClientSourceStore(props),
        generatorClientSourceTable(props),
    ]);
};
