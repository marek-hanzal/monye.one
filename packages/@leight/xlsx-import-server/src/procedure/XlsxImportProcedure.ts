import {
    type IImportParams,
    type IImportParamsSchema
}                             from "@leight/import";
import {type IJobWithParams}  from "@leight/job";
import {withHandler}          from "@leight/trpc-server";
import {ImportServiceContext} from "../context";

export const XlsxImportProcedure = withHandler<IImportParams, IJobWithParams<IImportParamsSchema>>({
    defaultErrorMessage: "Could not start an import job. Yaaykes!",
    handler:             async ({request, container}) => ImportServiceContext(container).resolve().async({params: request}),
});
