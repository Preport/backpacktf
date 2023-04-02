import {
    CharacterClass,
    ItemOrigin,
    ItemQuality,
    KillstreakTier,
    Paint,
    Rarity,
    Sheen,
    Slot,
    Spell,
    WearTier,
    StrangePart as BaseStrangePart
} from './exported/Item';
import { Price } from './Price';

export type v2ItemProps = Pick<
    v2Item,
    | 'australium'
    | 'craftable'
    | 'crateSeries'
    | 'tradable'
    | 'festivized'
    | 'killstreakTier'
    | 'craftNumber'
    | 'elevatedQuality'
>;
export interface v2Item {
    appid: number;
    australium?: boolean;
    festivized?: boolean;
    baseName: string;
    defindex: number;
    id: string;
    imageUrl: string;
    elevatedQuality?: Extract<ItemQuality, { name: 'Strange' }>;
    marketName: string;
    name: string;
    origin: ItemOrigin | null;
    originalId: string;
    price: Price;
    quality: ItemQuality;
    summary: string;
    texture: Texture;
    wearTier: WearTier;
    class?: CharacterClass[];
    slot?: Slot;
    particle?: Particle;
    tradable: boolean;
    craftable?: boolean;
    crateSeries: number;
    medalNumber?: any;
    priceindex?: string;
    killstreakTier?: KillstreakTier;
    level?: number;
    killEaters?: KillEater[];
    style?: Style;
    spells?: Spell[];
    paint?: Paint;
    paintSecondaryHex?: string;
    tag?: null;
    customName?: string;
    sheen?: Sheen;
    craftNumber?: number;
    craftedBy?: MadeBy;
    customDesc?: string;
    giftedBy?: MadeBy;
    equipped?: Equipped[];
    recipe: Record<string, any>;
    strangeParts?: StrangePartEater[];
}

export interface Texture {
    id: number;
    itemDefindex: number;
    rarity: Rarity;
    name: string;
}

export interface Particle {
    id: number;
    name: string;
    shortName: string;
    imageUrl: string;
    type: ParticleType;
}
export type ParticleType = 'standart' | 'taunt';

export interface KillEater {
    score: number;
    killEater: Pick<BaseStrangePart, 'name'>;
}

export interface Style {
    name: string;
}

export interface MadeBy {
    personaname: string;
    steamid: string;
}
export interface Equipped {
    class: number;
    slot: number;
}

export interface StrangePartEater {
    score: number;
    killEater: StrangePartKillEater;
}

export type StrangePartKillEater = BaseStrangePart & {
    item: KillEaterItem;
};

export interface KillEaterItem {
    appid: number;
    baseName: string;
    defindex: number;
    id: string;
    imageUrl: string;
    marketName: string;
    name: string;
    origin: null;
    originalId: string;
    price: Price;
    quality: ItemQuality;
    summary: string;
    tradable: boolean;
    craftable: boolean;
}
