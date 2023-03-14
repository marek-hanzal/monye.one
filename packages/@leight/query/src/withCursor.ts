import {type IQuery} from "./api";

export interface IWithCursorProps<T> {
    query?: IQuery;
    arg?: T;
    size?: number;
    page?: number;
}

export const withCursor = <T>({query, arg = {} as any, size = 50, page = 0}: IWithCursorProps<T>): T => {
    const take = query?.cursor?.size || size;
    const skip = take * (query?.cursor?.page || page);
    return {
        ...arg,
        take,
        skip,
    };
};
