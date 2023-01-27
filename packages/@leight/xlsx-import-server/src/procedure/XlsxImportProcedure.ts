import { ImportServiceContext } from "../context";
import { withHandler } from "@leight/trpc-server";
import { RequestSchema } from "@leight/xlsx-import";

export const XlsxImportProcedure = withHandler({
    request: RequestSchema,
    defaultErrorMessage: "Could not start an import job. Yaaykes!",
    handler: async ({ request, container }) => {
        return ImportServiceContext(container).resolve().async(request);
    },
});
