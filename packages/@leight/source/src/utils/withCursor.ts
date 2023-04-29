import {type IQuery} from "../schema";

export interface IWithCursorProps<T> {
    query?: IQuery;
    arg?: T;
    size?: number;
    page?: number;
}

export const withCursor = <T>({query, arg = {} as any, size, page}: IWithCursorProps<T>): T => {
    const take = query?.cursor?.size ?? size;
    const skip = query?.cursor?.page ?? page;

    return {
        ...arg,
        take: take !== undefined && skip !== undefined ? take : undefined,
        skip: take !== undefined && skip !== undefined ? take * skip : undefined,
    };
};
