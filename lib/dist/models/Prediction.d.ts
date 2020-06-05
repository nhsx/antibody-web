export declare const PredictionKeys: Readonly<{
    guard: (value: string) => value is "Positive" | "Negative";
    check: (value: string) => "Positive" | "Negative";
    values: ("Positive" | "Negative")[];
} & {
    type: "Positive" | "Negative";
}>;
export declare type PredictionKey = typeof PredictionKeys.type;
export declare type PredictionItem = {
    [K in PredictionKey]?: number;
};
export interface PredictionData extends Array<PredictionItem> {
}
