import { type IWithTranslation } from "@leight/i18n";
import { Translation } from "@leight/i18n-client";
import { Divider, Group, Table, Text, useMantineTheme } from "@mantine/core";
import { Dropzone as CoolDropzone, type FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import { type ComponentProps, type FC, useState } from "react";
import { switchScheme } from "../utils";
import { Paper } from "./Paper";
import { Upload } from "./Upload";
import { UploadProvider } from "@leight/file-client";

export interface IDropZoneProps
    extends Partial<
        Omit<ComponentProps<typeof CoolDropzone>, "children" | "onDrop">
    > {
    withTranslation: IWithTranslation;

    path: string;

    limit?: number;

    onDrop?(files: FileWithPath[], commit: () => void): void;
}

/**
 * Uploader component based on @leight/file-client Upload. Separation is because of this library
 * directly using Mantine, an Upload component is basically standalone.
 */
export const DropZone: FC<IDropZoneProps> = ({
    withTranslation,
    path,
    limit = 5,
    onDrop = () => null,
    ...props
}) => {
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    return (
        <>
            <Paper>
                <CoolDropzone
                    maxSize={8 * 1024 ** 2}
                    loading={loading}
                    onDrop={(files) => {
                        console.log("files", files);
                        setLoading(true);
                        setFiles([]);
                        setFiles(files.slice(0, limit));
                        onDrop?.(files, () => {
                            // setFiles([]);
                            setLoading(false);
                        });
                    }}
                    {...props}
                >
                    <Group
                        position={"center"}
                        spacing={"xl"}
                        style={{ minHeight: 220, pointerEvents: "none" }}
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
                                color={
                                    loading
                                        ? switchScheme(
                                              theme,
                                              theme.colors.green[4],
                                              theme.colors.green[6]
                                          )
                                        : switchScheme(
                                              theme,
                                              theme.colors.gray[4],
                                              theme.colors.gray[6]
                                          )
                                }
                            />
                        </CoolDropzone.Idle>
                        <div>
                            <Text size={"xl"} inline>
                                <Translation {...withTranslation} />
                            </Text>
                            <Text size={"sm"} color={"dimmed"} inline mt={7}>
                                <Translation
                                    {...withTranslation}
                                    label={`${withTranslation.label}.hint`}
                                />
                            </Text>
                        </div>
                    </Group>
                </CoolDropzone>
            </Paper>
            {files.length > 0 && (
                <>
                    <Divider m={"md"} />
                    <Paper>
                        <Table fontSize={"xs"} highlightOnHover>
                            <thead>
                                <tr>
                                    <th style={{ width: "360px" }}>
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
                                    <th style={{ width: "140px" }}>
                                        <Translation
                                            {...withTranslation}
                                            label={`${withTranslation.label}.actions`}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <UploadProvider>
                                        <tr key={file.path}>
                                            <td>{file.path}</td>
                                            <td>
                                                <Upload
                                                    upload={{ file, path }}
                                                />
                                            </td>
                                            <td>actions</td>
                                        </tr>
                                    </UploadProvider>
                                ))}
                            </tbody>
                        </Table>
                    </Paper>
                </>
            )}
        </>
    );
};
