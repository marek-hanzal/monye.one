import {type IContainer}         from "@leight/container";
import {withFileContainer}       from "@leight/file-server";
import {withFilterContainer}     from "@leight/filter-server";
import {withImportContainer}     from "@leight/import-server";
import {withJobContainer}        from "@leight/job-server";
import {withKeywordContainer}    from "@leight/keyword-server";
import {withLabelContainer}      from "@leight/label-server";
import {withUserContainer}       from "@leight/user-server";
import {withXlsxImportContainer} from "@leight/xlsx-import-server";

/**
 * @TODO Move this to standalone package (container-utils, container-ex...?)
 * @param container
 */
export const withServerContainer = (container: IContainer) => {
    withFileContainer(container);
    withXlsxImportContainer(container);
    withUserContainer(container);
    withJobContainer(container);
    withImportContainer(container);
    withKeywordContainer(container);
    withFilterContainer(container);
    withLabelContainer(container);
};
