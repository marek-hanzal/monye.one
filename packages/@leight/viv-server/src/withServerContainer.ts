import {type IContainer}   from "@leight/container";
import {withUserContainer} from "@leight/user-server";

export const withServerContainer = (container: IContainer) => {
    withUserContainer(container);

    // withFileContainer(container);
    // withXlsxImportContainer(container);
    // withJobContainer(container);
    // withImportContainer(container);
    // withKeywordContainer(container);
    // withFilterContainer(container);
    // withLabelContainer(container);
};
