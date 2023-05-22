export type IfExtends<TType, TExtends = void> = TExtends extends void ? TType : TType & TExtends;
