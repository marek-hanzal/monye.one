import {
    type IImportZoneProps,
    ImportZone
}                                  from "@leight/xlsx-import-client";
import {
    $TransactionImportHandler,
    type ITransactionImportParams
}                                  from "@monye.one/transaction";
import {useTransactionInvalidator} from "@monye.one/transaction-client";
import {trpc}                      from "@monye.one/trpc-client";
import {type FC}                   from "react";

export interface ITransactionImportProps extends Omit<IImportZoneProps<ITransactionImportParams>, "useJobGetQuery" | "withTranslation" | "mutation" | "params"> {
    account?: string;
}

export const TransactionImport: FC<ITransactionImportProps> = (
    {
        account,
        onSuccess,
        ...props
    }) => {
    const transactionInvalidator = useTransactionInvalidator();
    return <ImportZone<ITransactionImportParams>
        useJobGetQuery={trpc.job.repository.get.useQuery}
        mutation={trpc.transaction.import.xlsx.job}
        onSuccess={props => {
            transactionInvalidator();
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
