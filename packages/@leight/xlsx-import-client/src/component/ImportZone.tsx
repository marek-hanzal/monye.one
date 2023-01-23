import { DropZone, type IDropZoneProps } from "@leight/mantine";
import { MIME_TYPES } from "@mantine/dropzone";
import { type FC } from "react";

export interface IImportZoneProps extends Omit<IDropZoneProps, "path"> {
    path?: string;
}

export const ImportZone: FC<IImportZoneProps> = (props) => {
    return (
        <DropZone
            path={"/import"}
            onUpload={(files, commit) => {
                setTimeout(() => {
                    commit();
                }, 3500);
                files.forEach((file) => {
                    console.log("Import of", file);
                });
            }}
            accept={[MIME_TYPES.xls, MIME_TYPES.xlsx]}
            {...props}
        />
    );
};
