import {useTranslation}     from "@leight/i18n-client";
import {
    DropZone,
    type IDropZoneProps
}                           from "@leight/mantine";
import {LoopsProvider}      from "@leight/utils-client";
import {type IWithMutation} from "@leight/xlsx-import";
import {MIME_TYPES}         from "@mantine/dropzone";
import {notifications}      from "@mantine/notifications";
import {JobInline}          from "@monye.one/job-client";
import {type FC}            from "react";

export interface IImportZoneProps extends Omit<IDropZoneProps, "path"> {
    mutation: IWithMutation;
    path?: string;
}

export const ImportZone: FC<IImportZoneProps> = (
    {
        withTranslation,
        mutation: {useMutation},
        ...       props
    }) => {
    const {t}      = useTranslation(withTranslation.namespace);
    const mutation = useMutation();
    return <LoopsProvider>
        <DropZone
            path={"/import"}
            onUpload={(file) => {
                mutation.mutate(
                    {fileId: file.id},
                    {
                        onSuccess: job => {
                            notifications.show({
                                id:        job.id,
                                loading:   true,
                                autoClose: false,
                                title:     t("import.job.title"),
                                message:   <JobInline
                                               withTranslation={withTranslation}
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
