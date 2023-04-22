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
	$UserSource,
	$UserSourceMapper,
	type IUserSourceSchemaType
} from "@leight/user";

export interface IUserSourceService extends ISourceService<IUserSourceSchemaType> {
}

export class UserBaseSourceService extends AbstractSourceService<IUserSourceSchemaType> implements IUserSourceService {
	static inject = [
        $UserSource,
        $UserSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<IUserSourceSchemaType>,
        protected $mapper: ISourceMapper<IUserSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<IUserSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<IUserSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_z6zlgpwdrmijm63adu8gpo3v = true;