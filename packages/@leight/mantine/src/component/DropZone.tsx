import {
    type IFileSourceSchemaType,
    type IFileWithPath
}                                 from "@leight/file";
import {type IWithTranslation}    from "@leight/i18n";
import {
    Translation,
    useTranslation
}                                 from "@leight/i18n-client";
import {
    LoopProvider,
    LoopsStore
}                                 from "@leight/utils-client";
import {
    Divider,
    Group,
    Table,
    Text,
    useMantineTheme
}                                 from "@mantine/core";
import {Dropzone as CoolDropzone} from "@mantine/dropzone";
import {notifications}            from "@mantine/notifications";
import {
    IconCheck,
    IconUpload,
    IconX
}                                 from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    useEffect,
    useState
}                                 from "react";
import {switchScheme}             from "../utils";
import {Upload}                   from "./Upload";

export interface IDropZoneProps extends Partial<
    Omit<ComponentProps<typeof CoolDropzone>, "children" | "onDrop">
> {
    withTranslation: IWithTranslation;

    path: string;

    limit?: number;

    onDrop?(files: IFileWithPath[], commit: () => void): void;

    onUpload?(file: IFileSourceSchemaType["Entity"]): void;
}

/**
 * Uploader component based on @leight/file-client Upload. Separation is because of this library
 * directly using Mantine, an Upload component is basically standalone.
 */
export const DropZone: FC<IDropZoneProps> = (
    {
        withTranslation,
        path,
        limit = 5,
        onDrop = () => null,
        onUpload,
        ...props
    }) => {
    const theme             = useMantineTheme();
    const {t}               = useTranslation(withTranslation.namespace);
    const [files, setFiles] = useState<IFileWithPath[]>([]);
    const {current: loops}  = LoopsStore.useState();

    useEffect(() => {
        if (files.length > 0 && !loops) {
            setTimeout(() => {
                notifications.show({
                    icon:    <IconCheck size={"1.1rem"}/>,
                    color:   "teal",
                    title:   t("dropzone.upload.success.title"),
                    message: t("dropzone.upload.success.message"),
                });
                setFiles([]);
            }, 750);
        }
    }, [loops]);

    return <>
        {!files.length && (
            <CoolDropzone
                maxSize={8 * 1024 ** 2}
                onDrop={(files) => {
                    setFiles(files.slice(0, limit));
                    onDrop?.(files, () => {
                        // nope
                    });
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
                            stroke={"1.5"}
                            color={switchScheme(
                                theme,
                                theme.colors.green[4],
                                theme.colors.green[6]
                            )}
                        />
                    </CoolDropzone.Accept>
                    <CoolDropzone.Reject>
                        <IconX
                            size={50}
                            stroke={"1.5"}
                            color={switchScheme(
                                theme,
                                theme.colors.red[4],
                                theme.colors.red[6]
                            )}
                        />
                    </CoolDropzone.Reject>
                    <CoolDropzone.Idle>
                        <IconUpload
                            size={50}
                            stroke={"1.5"}
                            color={switchScheme(
                                theme,
                                theme.colors.gray[4],
                                theme.colors.gray[6]
                            )}
                        />
                    </CoolDropzone.Idle>
                    <div>
                        <Text size={"xl"} inline>
                            <Translation {...withTranslation} />
                        </Text>
                        <Text
                            size={"sm"}
                            color={"dimmed"}
                            inline
                            mt={7}
                        >
                            <Translation
                                {...withTranslation}
                                label={`${withTranslation.label}.hint`}
                            />
                        </Text>
                    </div>
                </Group>
            </CoolDropzone>
        )}
        {files.length > 0 && (
            <>
                <Divider m={"md"}/>
                <Table fontSize={"xs"} highlightOnHover>
                    <thead>
                        <tr>
                            <th style={{width: "420px"}}>
                                <Translation
                                    {...withTranslation}
                                    label={`${withTranslation.label}.file`}
                                />
                            </th>
                            <th>
                                <Translation
                                    {...withTranslation}
                                    label={`${withTranslation.label}.progress`}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <LoopProvider
                                key={file.path}
                            >
                                <tr>
                                    <td>{file.path}</td>
                                    <td>
                                        <Upload
                                            upload={{
                                                file,
                                                path,
                                                async onFinish({file}) {
                                                    onUpload?.(file);
                                                },
                                            }}
                                        />
                                    </td>
                                </tr>
                            </LoopProvider>
                        ))}
                    </tbody>
                </Table>
            </>
        )}
    </>;
};
