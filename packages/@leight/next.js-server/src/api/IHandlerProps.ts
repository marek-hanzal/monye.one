import type { NextApiRequest, NextApiResponse } from "next";
import { type IHrefQuery } from "@leight/core";

export interface IHandlerProps<
    TBody = unknown,
    THrefQuery extends IHrefQuery = IHrefQuery
> {
    request: NextApiRequest;
    body: TBody;
    query: THrefQuery;
    response: NextApiResponse;

    toBody(): Promise<Buffer>;

    end(chunk?: unknown): void;
}
