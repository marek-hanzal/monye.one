import {Prisma} from "@prisma/client";

export const decimalOf = (value: any): number => {
    return (new Prisma.Decimal(value)).toNumber();
};
