import { Logger } from "@leight/winston";
import type { NextApiRequest, NextApiResponse } from "next";
import { type IError, type IHandler } from "./api";
import { IHrefQuery } from "@leight/core";
import getRawBody from "raw-body";

const logger = Logger("@leight/next.js-server");

export const Endpoint =
    <
        TBody = unknown,
        TData = unknown,
        THrefQuery extends IHrefQuery = IHrefQuery
    >({
        handler,
    }: IHandler<TBody, TData, THrefQuery>) =>
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
