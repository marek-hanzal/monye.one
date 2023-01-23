import { Logger } from "@leight/winston";
import type { NextApiRequest, NextApiResponse } from "next";
import { type IError, type IHandler } from "./api";
import { IHrefQuery } from "@leight/core";

const logger = Logger("@leight/next.js-server");

export const Endpoint =
    <TData = unknown, THrefQuery extends IHrefQuery = IHrefQuery>({
        handler,
    }: IHandler<TData, THrefQuery>) =>
    async (
        request: NextApiRequest,
        response: NextApiResponse<TData | IError>
    ) => {
        try {
            const result = await handler({
                request,
                query: request.query as THrefQuery,
                response,
            });
            result && response.status(200).json(result);
        } catch (e) {
            logger.error(e);
            return response.status(500).json({ error: "Kaboom!" });
        }
    };
