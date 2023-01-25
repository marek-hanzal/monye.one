import { type NextApiRequest, type NextApiResponse } from "next";
import { type IError } from "./IError";

export type INextHandler<TData> = (
    request: NextApiRequest,
    response: NextApiResponse<TData | IError>
) => Promise<unknown>;
