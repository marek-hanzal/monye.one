import {type IContainer}               from "@leight/container";
import {
    $FilterRepository,
    $FilterRepositoryMapper
}                                      from "@leight/filter";
import {FilterRepositoryMapper}        from "./mapper";
import {FilterRepository}              from "./repository";
import {withFilterRepositoryContainer} from "./sdk";

export const registerFilterContainer = (container: IContainer) => {
    withFilterRepositoryContainer(container);
    container.bindClass($FilterRepository, FilterRepository);
    container.bindClass($FilterRepositoryMapper, FilterRepositoryMapper);
};
