import {useTranslation}        from "@leight/i18n-client";
import {type IUseJobFindQuery} from "@leight/job";
import {
    type IJobInlineProps,
    JobInline
}                              from "@leight/job-client";
import {
    DropZone,
    type IDropZoneProps
}                              from "@leight/mantine";
import {LoopsProvider}         from "@leight/utils-client";
import {type IWithMutation}    from "@leight/xlsx-import";
import {MIME_TYPES}            from "@mantine/dropzone";
import {notifications}         from "@mantine/notifications";

export interface IImportZoneProps<TParams extends Record<string, any>> extends Omit<IDropZoneProps, "path"> {
    mutation: IWithMutation;
    onSuccess?: IJobInlineProps["onSuccess"];
    useJobFindQuery: IUseJobFindQuery;
    path?: string;
    params?: Omit<TParams, "fileId">;
}

export const ImportZone = <TParams extends Record<string, any>>(
    {
        withTranslation,
        onSuccess,
        useJobFindQuery,
        mutation: {useMutation},
        params,
        ...props
    }: IImportZoneProps<TParams>) => {
    const {t}      = useTranslation(withTranslation.namespace);
    const mutation = useMutation();
    return <LoopsProvider>
        <DropZone
            path={"/import"}
            onUpload={(file) => {
                mutation.mutate(
                    {fileId: file.id, ...params},
                    {
                        onSuccess: job => {
                            notifications.show({
                                id:        job.id,
                                loading:   true,
                                autoClose: false,
                                title:     t("import.job.title"),
                                message:   <JobInline
                                               withTranslation={withTranslation}
                                               useJobFindQuery={useJobFindQuery}
                                               onSuccess={onSuccess}
                                               job={job}
                                           />,
                            });
                        },
                    }
                );
            }}
            accept={[
                MIME_TYPES.xls,
                MIME_TYPES.xlsx
            ]}
            withTranslation={withTranslation}
            {...props}
        />
    </LoopsProvider>;
};
