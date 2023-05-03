import {type IContainer} from "@leight/container";
import {
    FileContainer,
    type IFileContainer
}                        from "@leight/file-server";
import {
    FilterContainer,
    type IFilterContainer
}                        from "@leight/filter-server";
import {
    type IImportContainer,
    ImportContainer
}                        from "@leight/import-server";
import {
    type IJobContainer,
    JobContainer
}                        from "@leight/job-server";
import {
    type IKeywordContainer,
    KeywordContainer
}                        from "@leight/keyword-server";
import {
    ILabelContainer,
    LabelContainer
}                        from "@leight/label-server";
import {
    type IUserContainer,
    UserContainer,
}                        from "@leight/user-server";
import {
    type IXlsxImportContainer,
    XlsxImportContainer,
}                        from "@leight/xlsx-import-server";


export interface IServerContainer {
    FileContainer: IFileContainer;
    XlsxImportContainer: IXlsxImportContainer;
    UserContainer: IUserContainer;
    JobContainer: IJobContainer;
    ImportContainer: IImportContainer;
    KeywordContainer: IKeywordContainer;
    FilterContainer: IFilterContainer;
    LabelContainer: ILabelContainer;
}

export const ServerContainer = (container: IContainer): IServerContainer => {
    return {
        FileContainer:       FileContainer(container),
        XlsxImportContainer: XlsxImportContainer(container),
        UserContainer:       UserContainer(container),
        JobContainer:        JobContainer(container),
        ImportContainer:     ImportContainer(container),
        KeywordContainer:    KeywordContainer(container),
        FilterContainer:     FilterContainer(container),
        LabelContainer:      LabelContainer(container),
    };
};
