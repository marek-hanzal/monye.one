import {type IContainer} from "@leight/container";
import {
    $KeywordSource,
    $KeywordSourceMapper,
    $KeywordSourceService,
    type IKeywordSource,
    type IKeywordSourceMapper
}                        from "@leight/keyword";
import {
    type IKeywordSourceService,
    KeywordBaseSourceMapper,
    KeywordBaseSourceService
}                        from "./sdk";
import {KeywordSource}   from "./source";

export interface IKeywordContainer {
    KeywordSource: IKeywordSource;
    KeywordSourceService: IKeywordSourceService;
    KeywordSourceMapper: IKeywordSourceMapper;
}

export const KeywordContainer = (container: IContainer): IKeywordContainer => {
    container
        .bindClass($KeywordSource, KeywordSource)
        .bindClass($KeywordSourceService, KeywordBaseSourceService)
        .bindClass($KeywordSourceMapper, KeywordBaseSourceMapper);

    return {
        get KeywordSource() {
            return container.resolve<IKeywordSource>($KeywordSource);
        },
        get KeywordSourceService() {
            return container.resolve<IKeywordSourceService>($KeywordSourceService);
        },
        get KeywordSourceMapper() {
            return container.resolve<IKeywordSourceMapper>($KeywordSourceMapper);
        },
    };
};
