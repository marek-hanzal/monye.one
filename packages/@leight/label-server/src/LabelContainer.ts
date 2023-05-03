import {type IContainer} from "@leight/container";
import {
    $LabelSource,
    $LabelSourceMapper,
    $LabelSourceService,
    type ILabelSource,
    type ILabelSourceMapper
}                        from "@leight/label";
import {
    type ILabelSourceService,
    LabelBaseSourceMapper,
    LabelBaseSourceService
}                        from "./sdk";
import {LabelSource}     from "./source";

export interface ILabelContainer {
    LabelSource: ILabelSource;
    LabelSourceService: ILabelSourceService;
    LabelSourceMapper: ILabelSourceMapper;
}

export const LabelContainer = (container: IContainer): ILabelContainer => {
    container
        .bindClass($LabelSource, LabelSource)
        .bindClass($LabelSourceService, LabelBaseSourceService)
        .bindClass($LabelSourceMapper, LabelBaseSourceMapper);

    return {
        get LabelSource() {
            return container.resolve<ILabelSource>($LabelSource);
        },
        get LabelSourceService() {
            return container.resolve<ILabelSourceService>($LabelSourceService);
        },
        get LabelSourceMapper() {
            return container.resolve<ILabelSourceMapper>($LabelSourceMapper);
        },
    };
};
