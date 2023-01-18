import {
    createStyles,
    Group,
    Paper,
    Text
}                                 from "@mantine/core";
import {Dropzone as CoolDropzone} from "@mantine/dropzone";
import {
    IconPhoto,
    IconUpload,
    IconX
}                                 from "@tabler/icons";
import {
    type ComponentProps,
    type FC
}                                 from "react";
import {switchScheme}             from "../utils";

export interface IDropZoneProps extends Partial<ComponentProps<typeof CoolDropzone>> {
}

const useStyles = createStyles(theme => ({
    uploadIcon:  {
        color: switchScheme(theme, theme.colors.gray[4], theme.colors.gray[6]),
    },
    uploadClose: {
        color: switchScheme(theme, theme.colors.red[4], theme.colors.red[6]),
    },
}));

export const DropZone: FC<IDropZoneProps> = ({...props}) => {
    const {classes} = useStyles();
    return <Paper
        shadow={"md"}
        radius={"md"}
        withBorder
        m={"md"}
        p={"md"}
    >
        <CoolDropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={8 * 1024 ** 2}
            {...props}
        >
            <Group
                position={"center"}
                spacing={"xl"}
                style={{minHeight: 220, pointerEvents: "none"}}
            >
                <CoolDropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        className={classes.uploadIcon}
                    />
                </CoolDropzone.Accept>
                <CoolDropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        className={classes.uploadClose}
                    />
                </CoolDropzone.Reject>
                <CoolDropzone.Idle>
                    <IconPhoto size={50} stroke={1.5}/>
                </CoolDropzone.Idle>
                <div>
                    <Text size={"xl"} inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size={"sm"} color={"dimmed"} inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </CoolDropzone>
    </Paper>;
};
