import {type IContainer} from "@leight/container";
import {
    $FilterSource,
    $FilterSourceMapper,
    $FilterSourceService,
    type IFilterSource,
    type IFilterSourceMapper
}                        from "@leight/filter";
import {
    FilterBaseSourceMapper,
    FilterBaseSourceService,
    type IFilterSourceService
}                        from "./sdk";
import {FilterSource}    from "./source";

export interface IFilterContainer {
    FilterSource: IFilterSource;
    FilterSourceService: IFilterSourceService;
    FilterSourceMapper: IFilterSourceMapper;
}

export const FilterContainer = (container: IContainer): IFilterContainer => {
    container
        .bindClass($FilterSource, FilterSource)
        .bindClass($FilterSourceService, FilterBaseSourceService)
        .bindClass($FilterSourceMapper, FilterBaseSourceMapper);

    return {
        get FilterSource() {
            return container.resolve<IFilterSource>($FilterSource);
        },
        get FilterSourceService() {
            return container.resolve<IFilterSourceService>($FilterSourceService);
        },
        get FilterSourceMapper() {
            return container.resolve<IFilterSourceMapper>($FilterSourceMapper);
        },
    };
};
