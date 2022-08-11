export interface SelectOptionInterface {
    size: {
        [foodId: number]: {
            s?: number;
            m?: number;
            l?: number;
        };
    };
    temperature: {
        [foodId: number]: {
            h?: number;
            c?: number;
        };
    };
}
