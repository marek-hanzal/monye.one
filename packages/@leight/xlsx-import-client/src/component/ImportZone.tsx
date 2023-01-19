import {
    DropZone,
    type IDropZoneProps
}                   from "@leight/mantine";
import {MIME_TYPES} from "@mantine/dropzone";
import {type FC}    from "react";

export interface IImportZoneProps extends IDropZoneProps {
}

export const ImportZone: FC<IImportZoneProps> = props => {
    return <DropZone
        onUpload={(files, commit) => {
            setTimeout(() => {
                commit();
            }, 3500);
            files.forEach(file => {
                console.log("Import of", file);
            });
        }}
        accept={[
            MIME_TYPES.xls,
            MIME_TYPES.xlsx,
        ]}
        {...props}
    />;
};
