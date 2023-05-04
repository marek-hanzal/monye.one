/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceSelectProps,
	SourceSelect
} from "@leight/form-client";
import {FilterSelection} from "../Selection/FilterSelection";
import {FilterSourceStore} from "../Source/FilterSourceStore";
import {type IFilterSourceSchemaType} from "@leight/filter";

export interface IFilterSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceSelectProps<TFormSchemaType, IFilterSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const FilterSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: IFilterSourceSelect<TFormSchemaType>) => {
    return <SourceSelect<TFormSchemaType, IFilterSourceSchemaType>
        SelectionContext={FilterSelection}
        SourceStore={FilterSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_b3vva6ffeyziwjut3l0jqexw = true;