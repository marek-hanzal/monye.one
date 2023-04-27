import {type IKeywordSourceSchemaType} from "../schema";
import {type IKeywords}                from "./IKeywords";

export interface IKeywordService<TInput> {
    build(props: IKeywordService.IBuildProps<TInput>): Promise<string[]>;

    onBuild(props: IKeywordService.IOnBuildProps<TInput>): Promise<any>;

    /**
     * Generate keywords from the given input; empty array means clear all keywords.
     */
    keywordsOf(input: TInput): Promise<IKeywords>;

    onKeyword(props: IKeywordService.IOnKeywordProps<TInput>): Promise<any>;
}

export namespace IKeywordService {
    export interface IOnKeywordProps<TInput> {
        input: TInput;
        keyword: string;
        entity: IKeywordSourceSchemaType["Entity"];
    }

    export interface IBuildProps<TInput> {
        input: TInput;
    }

    export interface IOnBuildProps<TInput> {
        input: TInput;
    }
}
