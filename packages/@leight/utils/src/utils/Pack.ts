import {parse, stringify} from "devalue";

/**
 * Simple wrapper around current background implementation of stringify/parse.
 */
export class Pack {
    public static pack<T>(input: T): string {
        return stringify(input);
    }

    public static unpack<T>(input: string): T {
        return parse(input);
    }
}
