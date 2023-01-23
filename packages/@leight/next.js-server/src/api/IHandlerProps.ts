import type { NextApiRequest, NextApiResponse } from "next";
import { type IHrefQuery } from "@leight/core";

export interface IHandlerProps<THrefQuery extends IHrefQuery = IHrefQuery> {
    request: NextApiRequest;
    query: THrefQuery;
    response: NextApiResponse;
}
