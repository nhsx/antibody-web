export declare const StringUnion: <UnionType extends string>(...values: UnionType[]) => Readonly<{
    guard: (value: string) => value is UnionType;
    check: (value: string) => UnionType;
    values: UnionType[];
} & {
    type: UnionType;
}>;
