import {type IQuery} from "./schema";

export interface IWithCursorProps<T> {
    query?: IQuery;
    arg?: T;
    size?: number;
    page?: number;
}

export const withCursor = <T>({query, arg = {} as any, size, page}: IWithCursorProps<T>): T => {
    const take = query?.cursor?.size || size;
    const skip = take && page ? take * (query?.cursor?.page || page) : undefined;
    return {
        ...arg,
        take,
        skip,
    };
};
