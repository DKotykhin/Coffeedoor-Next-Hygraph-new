export enum GroupList {
    "coffee" = "coffeeList",
    "tea" = "teaList",
    "jam" = "jamList",
    "mills" = "millsList",
    "accessories" = "accessoriesList",
}
export interface ICatalogList {
    [GroupList.coffee]: {
        edges: ICard[];
    };
    [GroupList.tea]: {
        edges: ICard[];
    };
    [GroupList.jam]: {
        edges: ICard[];
    };
    [GroupList.mills]: {
        edges: ICard[];
    };
    [GroupList.accessories]: {
        edges: ICard[];
    };
}

export interface ICard {
    node: {
        id: string;
        bodyUa: IBody;
        bodyRu: IBody;
        bodyEn: IBody;
        cardImg: {
            url: string;
        };
        listImg: Array<{ url: string }>;
        weight?: number;
        price: number;
        order: boolean;
        hide: boolean;
        position: number;
    };
}

export interface IBody {
    title: string;
    name: string;
    description?: string;
    tm?: string;
    sort?: ISort;
    country?: string;
    textA?: string[];
    textList?: string[];
    textB?: string[];
    link?: {
        title: string;
        value: string;
    };
}

export interface IFilter {
    button: string;
    value: string;
}

export interface ISort {
    key: string;
    value: string;
}
