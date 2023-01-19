import {type IWithTranslation}    from "@leight/i18n";
import {Translation}              from "@leight/i18n-client";
import {
    Group,
    Text,
    useMantineTheme
}                                 from "@mantine/core";
import {Dropzone as CoolDropzone} from "@mantine/dropzone";
import {
    IconFileImport,
    IconUpload,
    IconX
}                                 from "@tabler/icons";
import {
    type ComponentProps,
    type FC
}                                 from "react";
import {switchScheme}             from "../utils";
import {Paper}                    from "./Paper";

export interface IDropZoneProps extends Partial<ComponentProps<typeof CoolDropzone>> {
    withTranslation: IWithTranslation;
    withHintTranslation: IWithTranslation;
}

export const DropZone: FC<IDropZoneProps> = ({withTranslation, withHintTranslation, ...props}) => {
    const theme = useMantineTheme();
    return <Paper>
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
                    Yahoo here
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={switchScheme(theme, theme.colors.gray[4], theme.colors.gray[6])}
                    />
                </CoolDropzone.Accept>
                <CoolDropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={switchScheme(theme, theme.colors.red[4], theme.colors.red[6])}
                    />
                </CoolDropzone.Reject>
                <CoolDropzone.Idle>
                    Idle here
                    <IconFileImport size={50} stroke={1.5}/>
                </CoolDropzone.Idle>
                <div>
                    <Text size={"xl"} inline>
                        <Translation {...withTranslation}/>
                    </Text>
                    <Text size={"sm"} color={"dimmed"} inline mt={7}>
                        <Translation {...withHintTranslation}/>
                    </Text>
                </div>
            </Group>
        </CoolDropzone>
    </Paper>;
};
