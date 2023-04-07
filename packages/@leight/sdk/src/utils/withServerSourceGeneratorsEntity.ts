import {type IGeneratorServerParams} from "../generator";

export interface IWithServerSourceGeneratorsEntityProps {
    entity: string;
    prisma: string;
    packages: {
        schema: string;
        prisma: string;
    };
}

/**
 * Generates single Prisma entity source (just helper function, should be used alone).
 */
export const withServerSourceGeneratorsEntity = ({entity, prisma, packages}: IWithServerSourceGeneratorsEntityProps): IGeneratorServerParams => {
    return {
        PrismaSource: {
            entities: [
                {
                    name:     entity,
                    prisma:   prisma,
                    packages: {
                        schema: packages.schema,
                        prisma: packages.prisma,
                    },
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:       entity,
                    withPrisma: true,
                    packages:   {
                        schema: packages.schema,
                    },
                },
            ],
        },
        TrpcSource:   {
            entities: [
                {
                    name:     entity,
                    packages: {
                        schema: packages.schema,
                    }
                }
            ]
        }
    };
};
