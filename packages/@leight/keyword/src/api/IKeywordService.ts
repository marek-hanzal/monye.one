import {type IKeywords} from "./IKeywords";

export interface IKeywordService<TInput> {
    build(input: TInput): Promise<string[]>;

    /**
     * Generate keywords from the given input; empty array means clear all keywords.
     */
    keywordsOf(input: TInput): Promise<IKeywords>;
}
