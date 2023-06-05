import {type IContainer} from "@leight/container";
import {$KeywordRepository} from "@leight/keyword";
import {KeywordRepository} from "./repository";
import {withKeywordRepositoryContainer} from "./sdk";

export const withKeywordContainer = (container: IContainer) => {
    withKeywordRepositoryContainer(container);

    container
        .bindClass($KeywordRepository, KeywordRepository);
};
