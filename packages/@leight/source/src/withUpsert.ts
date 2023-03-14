import {
    type ISource,
    type ISourceSchema
} from "./api";

export const withUpsert = ({create, filter, patch}: ISource.IUpsert<ISourceSchema>) => {
    return {
        where:  filter,
        create,
        update: patch,
    };
};
