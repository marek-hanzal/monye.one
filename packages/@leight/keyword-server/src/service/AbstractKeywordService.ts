import {
    type IKeywords,
    type IKeywordService
}                   from "@leight/keyword";
import {keywordsOf} from "@leight/utils";

export abstract class AbstractKeywordService<TInput> implements IKeywordService<TInput> {
    async build(input: TInput): Promise<string[]> {
        return (await this.keywordsOf(input)).filter(Boolean).reduce<string[]>((prev, current) => {
            return prev.concat(keywordsOf(current) || []);
        }, []);
    }

    abstract keywordsOf(input: TInput): Promise<IKeywords>;
}
