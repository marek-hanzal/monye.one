import {type RepositoryType} from "../repository/RepositoryType";

export interface IWithCursorProps<T> {
    query?: RepositoryType["Query"];
    arg?: T;
    size?: number;
    page?: number;
}

/**
 * @TODO add this to AbstractRepository
 * @param query
 * @param arg
 * @param size
 * @param page
 */
export const withCursor = <T>({
                                  query,
                                  arg = {} as any,
                                  size,
                                  page
                              }: IWithCursorProps<T>): T => {
    const take = query?.cursor?.size ?? size;
    const skip = query?.cursor?.page ?? page;

    return {
        ...arg,
        take: take !== undefined && skip !== undefined ? take : undefined,
        skip: take !== undefined && skip !== undefined ? take * skip : undefined,
    };
};
