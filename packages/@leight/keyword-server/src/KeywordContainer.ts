import {type IContainer} from "@leight/container";
import {
    $KeywordSource,
    $KeywordSourceMapper,
    $KeywordSourceService,
    type IKeywordSource
}                        from "@leight/keyword";
import {
    type IKeywordSourceMapper,
    type IKeywordSourceService,
    KeywordSource,
    KeywordSourceMapper,
    KeywordSourceService
}                        from "./sdk";

export interface IKeywordContainer {
    KeywordSource: IKeywordSource;
    KeywordSourceService: IKeywordSourceService;
    KeywordSourceMapper: IKeywordSourceMapper;
}

export const KeywordContainer = (container: IContainer): IKeywordContainer => {
    container
        .bindClass($KeywordSource, KeywordSource)
        .bindClass($KeywordSourceService, KeywordSourceService)
        .bindClass($KeywordSourceMapper, KeywordSourceMapper);

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
