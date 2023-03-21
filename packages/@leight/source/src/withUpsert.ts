export interface IWithUpsertProps {
    create: any;
    filter: any;
    patch: any;
}

export const withUpsert = ({create, filter: where, patch: update}: IWithUpsertProps) => {
    return {
        where,
        create,
        update,
    };
};
