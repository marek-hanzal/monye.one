import {Logger} from "@leight/winston";
import type {
    NextApiRequest,
    NextApiResponse
}               from "next";
import {
    type IError,
    type IHandler
}               from "./api";

const logger = Logger("@leight/next.js-server");

export const Endpoint = <TData = unknown>({handler}: IHandler<TData>) => async (request: NextApiRequest, response: NextApiResponse<TData | IError>) => {
    try {
        return response.status(200).json(await handler({
            request,
            response,
        }));
    } catch (e) {
        logger.error(e);
        return response.status(500).json({error: "Kaboom!"});
    }
};
