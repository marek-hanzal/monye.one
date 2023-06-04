import {
    type IImportParams,
    type IImportParamsSchema
}                            from "@leight/import";
import {type IJobWithParams} from "@leight/job";
import {withHandler}         from "@leight/trpc-server";
import {withImportService}   from "@leight/xlsx-import";

export const XlsxImportProcedure = withHandler<IImportParams, IJobWithParams<IImportParamsSchema>>({
    defaultErrorMessage: "Could not start an import job. Yaaykes!",
    handler:             async (
        {
            request,
            container
        }) => withImportService(container).async({params: request}),
});
