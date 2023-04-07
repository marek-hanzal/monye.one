import {type IGeneratorCommonParams} from "../generator";

export interface IWithSourceGeneratorsEntityProps {
    name: string;
    packages: {
        prisma: string;
    },
    sorts?: string[]
}

export const withSourceGeneratorsEntity = ({name, packages, sorts}: IWithSourceGeneratorsEntityProps): IGeneratorCommonParams => {
    return {
        SourceSchema: {
            entities: [
                {
                    name,
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name,
                }
            ]
        },
        PrismaEntity: {
            entities: [
                {
                    name,
                    packages: {
                        prisma: packages.prisma,
                    },
                    sorts,
                }
            ]
        },
    };
};
