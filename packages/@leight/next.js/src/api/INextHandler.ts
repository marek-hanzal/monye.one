import {
    type NextApiRequest,
    type NextApiResponse
}                    from "next";
import {type IError} from "./IError";

export type INextHandler<TResponse> = (
    request: NextApiRequest,
    response: NextApiResponse<TResponse | IError>
) => Promise<unknown>;
