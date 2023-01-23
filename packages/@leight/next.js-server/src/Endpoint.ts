import { Logger } from "@leight/winston";
import { IError, type IHandler, INextHandler } from "./api";
import { IHrefQuery } from "@leight/core";
import getRawBody from "raw-body";
import { NextApiRequest, NextApiResponse } from "next";

const logger = Logger("@leight/next.js-server");

export const Endpoint =
    <
        TBody = unknown,
        TData = unknown,
        THrefQuery extends IHrefQuery = IHrefQuery
    >({
        handler,
    }: IHandler<TBody, TData, THrefQuery>): INextHandler<TData> =>
    async (
        request: NextApiRequest,
        response: NextApiResponse<TData | IError>
    ) => {
        try {
            const result = await handler({
                request,
                body: request.body,
                query: request.query as THrefQuery,
                toBody() {
                    return getRawBody(request);
                },
                response,
                end: response.end,
            });
            result && response.status(200).json(result);
        } catch (e) {
            console.error(e);
            logger.error(e);
            return response.status(500).json({ error: "Kaboom!" });
        }
    };
