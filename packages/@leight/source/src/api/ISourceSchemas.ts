import {type ISourceSchema} from "./ISourceSchema";

export type ISourceSchemas<TSourceSchema extends ISourceSchema> = {
    EntitySchema: TSourceSchema["EntitySchema"];
    DtoSchema: TSourceSchema["DtoSchema"];
    ToCreateSchema: TSourceSchema["ToCreateSchema"];
    CreateSchema: TSourceSchema["CreateSchema"];
    ToPatchSchema: TSourceSchema["ToPatchSchema"];
    PatchSchema: TSourceSchema["PatchSchema"];
    FilterSchema: TSourceSchema["FilterSchema"];
    SortSchema: TSourceSchema["SortSchema"];
    ParamsSchema: TSourceSchema["ParamsSchema"];
    CursorSchema: TSourceSchema["CursorSchema"];
    QuerySchema: TSourceSchema["QuerySchema"];
}

export type InferSourceSchema<TSourceSchema extends ISourceSchemas<ISourceSchema>> = ISourceSchema<
    TSourceSchema["EntitySchema"],
    TSourceSchema["DtoSchema"],
    TSourceSchema["ToCreateSchema"],
    TSourceSchema["CreateSchema"],
    TSourceSchema["ToPatchSchema"],
    TSourceSchema["PatchSchema"],
    TSourceSchema["FilterSchema"],
    TSourceSchema["SortSchema"],
    TSourceSchema["ParamsSchema"]
>;
