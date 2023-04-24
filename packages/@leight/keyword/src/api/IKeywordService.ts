import {type IKeywordSourceSchemaType} from "../sdk";
import {type IKeywords}                from "./IKeywords";

export interface IKeywordService<TInput> {
    build(props: IKeywordService.IBuildProps<TInput>): Promise<string[]>;

    /**
     * Generate keywords from the given input; empty array means clear all keywords.
     */
    keywordsOf(input: TInput): Promise<IKeywords>;

    onKeyword(props: IKeywordService.IOnKeywordProps<TInput>): Promise<void>;
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
}
