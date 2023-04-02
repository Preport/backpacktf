export type ClassifiedItemBuy = {
    defindex: number;
    name: string;
    quality: number;
    attributes?: Attribute[];
};
export type ClassifiedItemSell = ClassifiedItemBuy & {
    id: number;
    original_id: number;
    level: number;
    inventory: number;
    quantity: number;
    origin: number;
    style?: number;
};

export type Attribute = {
    defindex: number;
    value?: number;
    float_value: number;
    is_output?: boolean;
    quantity?: number;
    quality?: number;
    itemdef?: number;
    attributes?: {
        defindex: number;
        value?: number;
        float_value: number;
    };
};
