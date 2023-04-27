import {
    type IImportZoneProps,
    ImportZone
}                from "@leight/xlsx-import-client";
import {
    $TransactionImportHandler,
    type ITransactionImportParams
}                from "@monye.one/transaction";
import {trpc}    from "@monye.one/trpc-client";
import {type FC} from "react";

export interface ITransactionImportProps extends Omit<IImportZoneProps<ITransactionImportParams>, "useJobFindQuery" | "withTranslation" | "mutation" | "params"> {
    account?: string;
}

export const TransactionImport: FC<ITransactionImportProps> = (
    {
        account,
        onSuccess,
        ...props
    }) => {
    const context = trpc.useContext();
    return <ImportZone<ITransactionImportParams>
        useJobFindQuery={trpc.job.source.find.useQuery}
        mutation={trpc.transaction.import.xlsx.job}
        onSuccess={props => {
            context.transaction.source.query.invalidate();
            context.transaction.source.count.invalidate();
            onSuccess?.(props);
        }}
        params={{
            service: $TransactionImportHandler.description,
            account,
        }}
        withTranslation={{
            namespace: "transaction",
            label:     "dropzone.import",
        }}
        {...props}
    />;
};
