import {type IGenerator} from "../../api";
import {
    generatorServerBaseSource,
    type IGeneratorServerBaseSourceParams
}                        from "./generatorServerBaseSource";
import {
    generatorServerPrismaSource,
    type IGeneratorServerPrismaSourceParams
}                        from "./generatorServerPrismaSource";
import {
    generatorServerSource,
    type IGeneratorServerSourceParams
}                        from "./generatorServerSource";
import {
    generatorServerTrpcSource,
    type IGeneratorServerTrpcSourceParams
}                        from "./generatorServerTrpcSource";

export interface IGeneratorServerParams {
    /**
     * Prisma source generator parameters.
     */
    PrismaSource?: IGeneratorServerPrismaSourceParams;
    /**
     * Generator for Source without Prisma connection.
     */
    BaseSource?: IGeneratorServerBaseSourceParams;
    /**
     * Generates public Source (this should NOT be extended in userland)
     */
    Source?: IGeneratorServerSourceParams;
    /**
     * If you want to generate standard Source TRPC procedure API, put your entities
     * here.
     */
    TrpcSource?: IGeneratorServerTrpcSourceParams;
}

export const generatorServer: IGenerator<IGeneratorServerParams> = async (
    {
        params: {
                    PrismaSource,
                    BaseSource,
                    Source,
                    TrpcSource,
                },
        ...     props
    }) => {
    await Promise.all([
        BaseSource ? generatorServerBaseSource({
            ...props,
            params: BaseSource,
        }) : undefined,
        PrismaSource ? generatorServerPrismaSource({
            ...props,
            params: PrismaSource,
        }) : undefined,
        Source ? generatorServerSource({
            ...props,
            params: Source,
        }) : undefined,
        TrpcSource ? generatorServerTrpcSource({
            ...props,
            params: TrpcSource,
        }) : undefined,
    ]);
};
