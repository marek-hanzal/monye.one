import {type IContainer} from "@leight/container";
import {$LabelRepository, $LabelRepositoryMapper} from "@leight/label";
import {LabelRepositoryMapper} from "./mapper";
import {LabelRepository} from "./repository";
import {withLabelRepositoryContainer} from "./sdk";

export const withLabelContainer = (container: IContainer) => {
    withLabelRepositoryContainer(container);
    container
        .bindClass($LabelRepository, LabelRepository)
        .bindClass($LabelRepositoryMapper, LabelRepositoryMapper);
};
