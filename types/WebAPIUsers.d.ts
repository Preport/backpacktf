export namespace WebAPIUsers {
    export interface UserResponse {
        response: {
            success: 1 | 0;
            current_time: number;
            players: {
                [steamid64: string]: {
                    steamid: string;
                    success: 1 | 0;
                    backpack_value: {
                        [appid: string]: number;
                    };
                    backpack_update: {
                        [appid: string]: number;
                    };
                    name: string;
                    backpack_tf_trust: {
                        for: number;
                        against: number;
                    };
                };
            };
        };
    }
    export interface ImpersonatedResponse {
        results: {
            steamid: string;
            personaname: string;
            avatar: string;
        }[];
        total: number;
    }
}
