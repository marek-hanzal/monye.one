import {type IWithTranslation}    from "@leight/i18n";
import {Translation}              from "@leight/i18n-client";
import {
    Group,
    Text,
    useMantineTheme
}                                 from "@mantine/core";
import {Dropzone as CoolDropzone} from "@mantine/dropzone";
import {
    IconUpload,
    IconX
}                                 from "@tabler/icons";
import {
    type ComponentProps,
    type FC
}                                 from "react";
import {switchScheme}             from "../utils";
import {Paper}                    from "./Paper";

export interface IDropZoneProps extends Partial<Omit<ComponentProps<typeof CoolDropzone>, "children">> {
    withTranslation: IWithTranslation;
    withHintTranslation: IWithTranslation;
}

export const DropZone: FC<IDropZoneProps> = ({loading, withTranslation, withHintTranslation, onDrop, ...props}) => {
    const theme = useMantineTheme();
    return <Paper>
        <CoolDropzone
            maxSize={8 * 1024 ** 2}
            loading={loading}
            onDrop={files => {
                console.log("handling upload!");
                onDrop?.(files);
            }}
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
                        color={switchScheme(theme, theme.colors.green[4], theme.colors.green[6])}
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
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={loading ? switchScheme(theme, theme.colors.green[4], theme.colors.green[6]) : switchScheme(theme, theme.colors.gray[4], theme.colors.gray[6])}
                    />
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
