import {type IContainer} from "@leight/container";
import {
    FileContainer as $FileContainer,
    type IFileContainer
}                        from "@leight/file-server";
import {
    type IImportContainer,
    ImportContainer as $ImportContainer
}                        from "@leight/import-server";
import {
    type IJobContainer,
    JobContainer as $JobContainer
}                        from "@leight/job-server";
import {
    type IUserContainer,
    UserContainer as $UserContainer,
}                        from "@leight/user-server";
import {
    type IXlsxImportContainer,
    XlsxImportContainer as $XlsxImportContainer
}                        from "@leight/xlsx-import-server";


export interface IServerContainer {
    FileContainer: IFileContainer;
    XlsxImportContainer: IXlsxImportContainer;
    UserContainer: IUserContainer;
    JobContainer: IJobContainer;
    ImportContainer: IImportContainer;
}

export const ServerContainer = (container: IContainer): IServerContainer => {
    return {
        FileContainer:       $FileContainer(container),
        XlsxImportContainer: $XlsxImportContainer(container),
        UserContainer:       $UserContainer(container),
        JobContainer:        $JobContainer(container),
        ImportContainer:     $ImportContainer(container),
    };
};
