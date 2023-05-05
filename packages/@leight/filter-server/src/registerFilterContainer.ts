import {type IContainer}         from "@leight/container";
import {
    $FilterSource,
    $FilterSourceMapper,
    $FilterSourceService
}                                from "@leight/filter";
import {FilterRepositoryMapper}  from "./mapper";
import {FilterBaseSourceService} from "./sdk";
import {FilterSource}            from "./source";

export const registerFilterContainer = (container: IContainer) => {
    container
        .bindClass($FilterSource, FilterSource)
        .bindClass($FilterSourceService, FilterBaseSourceService)
        .bindClass($FilterSourceMapper, FilterRepositoryMapper);
};
