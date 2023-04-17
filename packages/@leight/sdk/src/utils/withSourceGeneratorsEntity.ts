import {type IPackageType}           from "@leight/generator";
import {type IGeneratorCommonParams} from "../generator";

export interface IWithSourceGeneratorsEntityProps {
    name: string;
    packages: {
        prisma: string;
    },
    sorts?: string[];
    withPrismaSchemaEx?: {
        entity: IPackageType;
    };
    withSourceSchemaEx?: {
        extends?: IPackageType[];
    };
}

export const withSourceGeneratorsEntity = ({name, packages, sorts, withSourceSchemaEx, withPrismaSchemaEx}: IWithSourceGeneratorsEntityProps): IGeneratorCommonParams => {
    return {
        PrismaSource: {
            entities: [
                {
                    name,
                    packages:     {
                        prisma: packages.prisma,
                    },
                    withSchemaEx: withPrismaSchemaEx,
                    withSourceEx: withSourceSchemaEx,
                    sorts,
                }
            ]
        },
    };
};
