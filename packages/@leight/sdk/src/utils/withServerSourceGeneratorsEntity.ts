import {IPackageType}                from "@leight/generator";
import {type IGeneratorServerParams} from "../generator";

export interface IWithServerSourceGeneratorsEntityProps {
    name: string;
    prisma: string;
    packages: {
        schema: string;
        prisma: string;
    };
    withSourceEx?: IPackageType;
    withMapperEx?: IPackageType;
    withInclude?: Record<string, any>;
    disabled?: ("trpc")[];
}

/**
 * Generates single Prisma entity source (just helper function, should be used alone).
 */
export const withServerSourceGeneratorsEntity = (
    {
        name,
        disabled = [],
        prisma,
        packages,
        withInclude,
        withSourceEx,
        withMapperEx,
    }: IWithServerSourceGeneratorsEntityProps): IGeneratorServerParams => {
    return {
        PrismaSource: {
            entities: [
                {
                    name,
                    prisma,
                    packages: {
                        schema: packages.schema,
                        prisma: packages.prisma,
                    },
                    withInclude,
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name,
                    withPrisma: true,
                    packages:   {
                        schema: packages.schema,
                    },
                    sourceEx:   withSourceEx,
                    mapperEx:   withMapperEx,
                },
            ],
        },
        TrpcSource:   disabled?.includes("trpc") ? undefined : {
            entities: [
                {
                    name,
                    packages: {
                        schema: packages.schema,
                    }
                }
            ]
        }
    };
};
