import {type IWithImportMutation} from "@leight/import";
import {type IUseJobSourceQuery}  from "@leight/job";
import {
    type IJobInlineProps,
    withJobNotification
}                                 from "@leight/job-client";
import {
    DropZone,
    type IDropZoneProps
}                                 from "@leight/mantine";
import {LoopsProvider}            from "@leight/utils-client";
import {MIME_TYPES}               from "@mantine/dropzone";

export interface IImportZoneProps<TParams extends Record<string, any>> extends Omit<IDropZoneProps, "path"> {
    mutation: IWithImportMutation;
    onSuccess?: IJobInlineProps["onSuccess"];
    useJobFindQuery: IUseJobSourceQuery["useFind"];
    path?: string;
    /**
     * Override import service name
     */
    service?: string;
    params?: Omit<TParams, "fileId">;
}

export const ImportZone = <TParams extends Record<string, any>>(
    {
        withTranslation,
        onSuccess,
        onUpload,
        useJobFindQuery,
        mutation: {useMutation},
        service,
        params,
        ...props
    }: IImportZoneProps<TParams>) => {
    const mutation = useMutation();
    return <LoopsProvider>
        <DropZone
            path={"/import"}
            onUpload={file => {
                mutation.mutate(
                    {
                        service,
                        fileId: file.id,
                        ...params
                    },
                    {
                        onSuccess: job => {
                            withJobNotification({
                                job,
                                withTranslation,
                                useJobFindQuery,
                                onSuccess,
                            });
                        },
                    }
                );
                onUpload?.(file);
            }}
            accept={[
                MIME_TYPES.xls,
                MIME_TYPES.xlsx,
            ]}
            withTranslation={withTranslation}
            {...props}
        />
    </LoopsProvider>;
};
