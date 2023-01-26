import { Logger } from "@leight/winston";
import { type IHrefQuery } from "@leight/utils";
import getRawBody from "raw-body";
import { type NextApiRequest, type NextApiResponse } from "next";
import {
    TokenServiceContext,
    UserIdContext,
    UserServiceContext,
} from "@leight/user-server";
import { getToken } from "next-auth/jwt";
import { TokenError, UserError } from "@leight/user";
import { type IError, type IHandler, type INextHandler } from "./api";

const logger = Logger("@leight/next.js-server");

export const Endpoint =
    <
            TRequest = unknown,
            TResponse = unknown,
            THrefQuery extends IHrefQuery = IHrefQuery
        >({
            handler,
            container,
            withTokens,
        }: IHandler<
            TRequest,
            TResponse,
            THrefQuery
        >): INextHandler<TResponse> =>
        async (
            request: NextApiRequest,
            response: NextApiResponse<TResponse | IError>
        ) => {
            try {
                const $container = container.createChildContainer();
                const token = await getToken({ req: request });
                const tokenService = TokenServiceContext($container)
                    .register((token?.tokens || []) as [])
                    .resolve();
                UserIdContext($container).register(token?.sub);

                tokenService.checkAny(withTokens);

                const result = await handler({
                    container: $container,
                    tokenService,
                    userService: UserServiceContext($container).resolve(),
                    request,
                    body: request.body,
                    query: request.query as THrefQuery,
                    toBody() {
                        return getRawBody(request);
                    },
                    response,
                    end: response.end,
                });

                return result && (await response.status(200).json(result));
            } catch (e) {
                if (e instanceof TokenError) {
                    return response
                        .status(403)
                        .json({ error: "Token: Access denied." });
                }
                if (e instanceof UserError) {
                    return response
                        .status(403)
                        .json({ error: "User: Access denied." });
                }
                console.error(e);
                logger.error(e);
                return response.status(500).json({ error: "Kaboom!" });
            }
        };;
