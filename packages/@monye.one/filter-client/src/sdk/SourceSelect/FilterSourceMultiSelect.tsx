/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceMultiSelectProps,
	SourceMultiSelect
} from "@leight/form-client";
import {FilterMultiSelection} from "../Selection/FilterMultiSelection";
import {FilterSourceStore} from "../Source/FilterSourceStore";
import {type IFilterSourceSchemaType} from "@leight/filter";

export interface IFilterMultiSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceMultiSelectProps<TFormSchemaType, IFilterSourceSchemaType>, "SelectionContext" | "SourceStore"> {
}

export const FilterMultiSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: IFilterMultiSourceSelect<TFormSchemaType>) => {
    return <SourceMultiSelect<TFormSchemaType, IFilterSourceSchemaType>
        SelectionContext={FilterMultiSelection}
        SourceStore={FilterSourceStore}
        {...props}
    />
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zmr524ia5qd8un5p8cq9ccet = true;