export namespace KeysOf {
    export type Keys<TObject extends object> = Extract<keyof TObject, string>;

    export type Paths<TObject extends object> = {
        [TKey in keyof TObject & (string | number)]:
        TObject[TKey] extends any[] ?
            `${TKey}` :
            TObject[TKey] extends object
                ? `${TKey}` | `${TKey}.${Paths<TObject[TKey]>}`
                : `${TKey}`;
    }[keyof TObject & (string | number)];

    type ILeavesOf = Record<string, any>;
    type LiteralType =
        string
        | number
        | boolean
        | bigint;
    type GetDirtyDTOKeys<O extends ILeavesOf> = {
        [K in keyof O]-?: NonNullable<O[K]> extends Array<any>
            ? K : NonNullable<O[K]> extends LiteralType
                ? K
                : K extends string
                    ? GetDirtyDTOKeys<NonNullable<O[K]>> extends infer NK
                        ? NK extends string
                            ? `${K}.${NK}`
                            : never
                        : never
                    : never
    }[keyof O];
    type AllDTOKeys =
        string
        | number
        | symbol;
    type TrashDTOKeys =
        `${string}.undefined`
        | number
        | symbol;
    type ExcludeTrashDTOKeys<O extends AllDTOKeys> = O extends TrashDTOKeys ? never : O;
    export type Leaves<TLeavesOf extends ILeavesOf> = ExcludeTrashDTOKeys<GetDirtyDTOKeys<TLeavesOf>>;
}
