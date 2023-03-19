import {
    DropZone,
    type IDropZoneProps
}                           from "@leight/mantine";
import {type IWithMutation} from "@leight/xlsx-import";
import {MIME_TYPES}         from "@mantine/dropzone";
import {type FC}            from "react";

export interface IImportZoneProps extends Omit<IDropZoneProps, "path"> {
    mutation: IWithMutation;
    path?: string;
}

export const ImportZone: FC<IImportZoneProps> = (
    {
        mutation: {useMutation},
        ...       props
    }) => {
    const mutation = useMutation();
    return <DropZone
        path={"/import"}
        onUpload={(file) => {
            mutation.mutate(
                {fileId: file.id},
                {
                    onSuccess: (job) => {
                        console.log(
                            "Import started of ",
                            file,
                            job,
                            job.created
                        );
                    },
                }
            );
        }}
        accept={[
            MIME_TYPES.xls,
            MIME_TYPES.xlsx
        ]}
        {...props}
    />;
};
