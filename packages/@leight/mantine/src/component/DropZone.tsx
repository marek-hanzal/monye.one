import { type IWithTranslation } from "@leight/i18n";
import { Translation } from "@leight/i18n-client";
import { Divider, Group, Table, Text, useMantineTheme } from "@mantine/core";
import { Dropzone as CoolDropzone, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons";
import { type ComponentProps, type FC, useState } from "react";
import { switchScheme } from "../utils";
import { Paper } from "./Paper";
import { IUploadProps, Upload } from "./Upload";

export interface IDropZoneProps
    extends Partial<
            Omit<ComponentProps<typeof CoolDropzone>, "children" | "onDrop">
        >,
        Pick<IUploadProps, "commitHref" | "chunkHref"> {
    withTranslation: IWithTranslation;

    onUpload?(files: FileWithPath[], commit: () => void): void;
}

export const DropZone: FC<IDropZoneProps> = ({
    withTranslation,
    onUpload = () => null,
    chunkHref,
    commitHref,
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
                        setFiles(files);
                        onUpload?.(files, () => {
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
                                stroke={1.5}
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
                                stroke={1.5}
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
                                stroke={1.5}
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
                                    <tr key={file.path}>
                                        <td>{file.path}</td>
                                        <td>
                                            <Upload
                                                file={file}
                                                chunkHref={chunkHref}
                                                commitHref={commitHref}
                                            />
                                        </td>
                                        <td>actions</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Paper>
                </>
            )}
        </>
    );
};
