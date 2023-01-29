import {withHandler} from "@leight/trpc-server";
import {IRequestType, IResponseType} from "@leight/xlsx-import";
import {ImportServiceContext} from "../context";

export const XlsxImportProcedure = withHandler<IRequestType, IResponseType>({
    defaultErrorMessage: "Could not start an import job. Yaaykes!",
    handler: async ({request, container}) => ImportServiceContext(container).resolve().async(request),
});
