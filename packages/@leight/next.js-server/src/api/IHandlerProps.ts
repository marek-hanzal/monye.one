import type { NextApiRequest, NextApiResponse } from "next";
import { type IHrefQuery } from "@leight/core";
import { container } from "tsyringe";
import { ITokenService, IUserService } from "@leight/user";

export interface IHandlerProps<
    TBody = unknown,
    THrefQuery extends IHrefQuery = IHrefQuery
> {
    container: typeof container;
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
