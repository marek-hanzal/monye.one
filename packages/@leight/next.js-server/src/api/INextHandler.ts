import { NextApiRequest, NextApiResponse } from "next";
import { IError } from "./IError";

export type INextHandler<TData> = (
    request: NextApiRequest,
    response: NextApiResponse<TData | IError>
) => Promise<unknown>;
