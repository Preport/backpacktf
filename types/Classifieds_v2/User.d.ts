export interface User {
    id: string;
    name: string;
    avatar: string;
    avatarFull: string;
    premium: boolean;
    online: boolean;
    banned: boolean;
    customNameStyle: string;
    acceptedSuggestions: number;
    class: string;
    style: string;
    role: null;
    tradeOfferUrl: string;
    isMarketplaceSeller: boolean;
    flagImpersonated: null;
    bans: any[];
}

export interface UserAgent {
    client: string;
    lastPulse: number;
}
