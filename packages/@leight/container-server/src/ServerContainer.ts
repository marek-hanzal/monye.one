import "reflect-metadata";
import {FileContainer as $FileContainer, type IFileContainer,} from "@leight/file-server";
import {type IXlsxImportContainer, XlsxImportContainer as $XlsxImportContainer,} from "@leight/xlsx-import-server";
import {type IUserContainer, UserContainer as $UserContainer,} from "@leight/user-server";
import {type IJobContainer, JobContainer as $JobContainer} from "@leight/job-server";
import {type IImportContainer, ImportContainer as $ImportContainer} from "@leight/import-server";
import {$Container, type IContainer} from "@leight/container";

export interface IServerContainer {
    FileContainer: IFileContainer;
    XlsxImportContainer: IXlsxImportContainer;
    UserContainer: IUserContainer;
    JobContainer: IJobContainer;
    ImportContainer: IImportContainer;
}

export const ServerContainer = (container: IContainer): IServerContainer => {
    container.register<IContainer>($Container, {
        useValue: container,
    })
    return {
        FileContainer: $FileContainer(container),
        XlsxImportContainer: $XlsxImportContainer(container),
        UserContainer: $UserContainer(container),
        JobContainer: $JobContainer(container),
        ImportContainer: $ImportContainer(container),
    };
};
