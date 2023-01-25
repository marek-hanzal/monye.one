import { type IWithTranslation } from "@leight/i18n";
import { Translation } from "@leight/i18n-client";
import { Divider, Group, Table, Text, useMantineTheme } from "@mantine/core";
import { Dropzone as CoolDropzone } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import { type ComponentProps, type FC, useState } from "react";
import { switchScheme } from "../utils";
import { Paper } from "./Paper";
import { Upload } from "./Upload";
import { LoopProvider } from "@leight/utils-client";
import { UploadControls } from "./UploadControls";
import { type IFileWithPath } from "@leight/file";

export interface IDropZoneProps
    extends Partial<
        Omit<ComponentProps<typeof CoolDropzone>, "children" | "onDrop">
    > {
    withTranslation: IWithTranslation;

    path: string;

    limit?: number;

    onDrop?(files: IFileWithPath[], commit: () => void): void;
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
    const [files, setFiles] = useState<IFileWithPath[]>([]);
    return (
        <>
            {!files.length && (
                <Paper>
                    <CoolDropzone
                        maxSize={8 * 1024 ** 2}
                        onDrop={(files) => {
                            console.log("files", files);
                            setFiles(files.slice(0, limit));
                            onDrop?.(files, () => {});
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
                </Paper>
            )}
            {files.length > 0 && (
                <>
                    <Divider m={"md"} />
                    <Paper>
                        <Table fontSize={"xs"} highlightOnHover>
                            <thead>
                                <tr>
                                    <th style={{ width: "420px" }}>
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
                                    <LoopProvider key={file.path}>
                                        <tr>
                                            <td>{file.path}</td>
                                            <td>
                                                <Upload
                                                    upload={{ file, path }}
                                                />
                                            </td>
                                            <td>
                                                <UploadControls />
                                            </td>
                                        </tr>
                                    </LoopProvider>
                                ))}
                            </tbody>
                        </Table>
                    </Paper>
                </>
            )}
        </>
    );
};
