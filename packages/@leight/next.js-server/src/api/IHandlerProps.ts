import type {
    NextApiRequest,
    NextApiResponse
} from "next";

export interface IHandlerProps {
    request: NextApiRequest;
    response: NextApiResponse;
}
