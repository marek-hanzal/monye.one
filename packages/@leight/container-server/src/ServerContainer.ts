import {
    FileContainer as $FileContainer,
    type IFileContainer,
} from "@leight/file-server";
import {
    type IImportContainer,
    ImportContainer as $ImportContainer,
} from "@leight/xlsx-import-server";
import {
    type IUserContainer,
    UserContainer as $UserContainer,
} from "@leight/user-server";
import { container } from "tsyringe";

export interface IServerContainer {
    FileContainer: IFileContainer;
    ImportContainer: IImportContainer;
    UserContainer: IUserContainer;
}

export const ServerContainer = (target: typeof container): IServerContainer => {
    const FileContainer = $FileContainer(target);
    const ImportContainer = $ImportContainer(target);
    const UserContainer = $UserContainer(target);
    return {
        FileContainer,
        ImportContainer,
        UserContainer,
    };
};
