/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractSourceService} from "@leight/source-server";
import {
	type ISourceService,
	type ISourceMapper,
	type ISource
} from "@leight/source";
import {
	$LabelSource,
	$LabelSourceMapper,
	type ILabelSourceSchemaType
} from "@leight/label";

export interface ILabelSourceService extends ISourceService<ILabelSourceSchemaType> {
}

export class LabelBaseSourceService extends AbstractSourceService<ILabelSourceSchemaType> implements ILabelSourceService {
	static inject = [
        $LabelSource,
        $LabelSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<ILabelSourceSchemaType>,
        protected $mapper: ISourceMapper<ILabelSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<ILabelSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<ILabelSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_pbyf1ztkctrvwh6dycm5ny7n = true;