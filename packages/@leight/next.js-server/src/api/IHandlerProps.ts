import type {NextApiRequest, NextApiResponse} from "next";
import {type IHrefQuery} from "@leight/utils";
import {type ITokenService, type IUserService} from "@leight/user";
import {type IContainer} from "@leight/container";

export interface IHandlerProps<
    TBody = unknown,
    THrefQuery extends IHrefQuery = IHrefQuery
> {
    container: IContainer;
    request: NextApiRequest;
    body: TBody;
    query: THrefQuery;
    response: NextApiResponse;

    toBody(): Promise<Buffer>;

    end(chunk?: unknown): void;

    /**
     * Access to current user's tokens.
     */
    tokenService: ITokenService;
    /**
     * Access to current user.
     */
    userService: IUserService;
}
