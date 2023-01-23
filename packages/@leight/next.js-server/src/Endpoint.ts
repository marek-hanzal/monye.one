import { Logger } from "@leight/winston";
import { type IError, type IHandler, type INextHandler } from "./api";
import { type IHrefQuery } from "@leight/core";
import getRawBody from "raw-body";
import { type NextApiRequest, type NextApiResponse } from "next";
import { TokenServiceUtils } from "@leight/user";
import { getToken } from "next-auth/jwt";

const logger = Logger("@leight/next.js-server");

export const Endpoint =
    <
        TBody = unknown,
        TData = unknown,
        THrefQuery extends IHrefQuery = IHrefQuery
    >({
        handler,
        container,
    }: IHandler<TBody, TData, THrefQuery>): INextHandler<TData> =>
    async (
        request: NextApiRequest,
        response: NextApiResponse<TData | IError>
    ) => {
        try {
            const result = await handler({
                container: TokenServiceUtils.withTokens(
                    container,
                    ((await getToken({ req: request }))?.tokens || []) as []
                ),
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
