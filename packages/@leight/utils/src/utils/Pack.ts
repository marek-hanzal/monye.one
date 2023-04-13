/**
 * Simple wrapper around current background implementation of stringify/parse.
 */
export class Pack {
    public static async pack<T>(input: T): Promise<string> {
        return import("devalue").then(({stringify}) => stringify(input));
    }

    public static async unpack<T>(input: string): Promise<T> {
        return import("devalue").then(({parse}) => parse(input));
    }
}
