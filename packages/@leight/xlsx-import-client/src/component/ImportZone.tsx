import {
    DropZone,
    type IDropZoneProps
}                   from "@leight/mantine";
import {MIME_TYPES} from "@mantine/dropzone";
import {
    type FC,
    useState
}                   from "react";

export interface IImportZoneProps extends Omit<IDropZoneProps, "onDrop"> {
}

export const ImportZone: FC<IImportZoneProps> = props => {
    const [loading, setLoading] = useState(false);
    return <DropZone
        loading={loading}
        onDrop={files => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
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
