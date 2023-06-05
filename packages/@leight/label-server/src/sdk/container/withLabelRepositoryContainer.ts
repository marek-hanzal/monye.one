/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseLabelRepositoryEx} from "../repository/BaseLabelRepositoryEx";
import {BaseLabelRepositoryMapper} from "../mapper/BaseLabelRepositoryMapper";
import {BaseLabelRepositoryService} from "../service/BaseLabelRepositoryService";
import {
	$LabelRepository,
	$LabelRepositoryMapper,
	$LabelRepositoryService
} from "@leight/label";

export const withLabelRepositoryContainer = (container: IContainer) => {
    container.bindClass($LabelRepository, BaseLabelRepositoryEx);
    container.bindClass($LabelRepositoryMapper, BaseLabelRepositoryMapper);
    container.bindClass($LabelRepositoryService, BaseLabelRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_xn6b654knywnotgy1i2clwwx = true;