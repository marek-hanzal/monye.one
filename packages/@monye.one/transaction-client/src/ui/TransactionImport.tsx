import {ImportZone}                    from "@leight/xlsx-import-client";
import {type ITransactionImportParams} from "@monye.one/transaction";
import {trpc}                          from "@monye.one/trpc-client";
import {type FC}                       from "react";

export interface ITransactionImportProps {
    account?: string;
}

export const TransactionImport: FC<ITransactionImportProps> = ({account}) => {
    const context = trpc.useContext();
    return <ImportZone<ITransactionImportParams>
        useJobFindQuery={trpc.job.source.find.useQuery}
        mutation={trpc.transaction.import.xlsx.job}
        onSuccess={() => {
            context.transaction.source.query.invalidate();
            context.transaction.source.count.invalidate();
        }}
        params={{
            account,
        }}
        withTranslation={{
            label:     "dropzone.import",
            namespace: "transaction",
        }}
    />;
};
