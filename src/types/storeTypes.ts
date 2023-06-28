export interface ICatalogList {
    coffeeList: { 
        edges: ICard[]
    };
    jamList: { 
        edges: ICard[]
    };
    teaList: { 
        edges: ICard[]
    };
    millsList: { 
        edges: ICard[]
    };
    accessoriesList: { 
        edges: ICard[]
    };
}

export interface ICard {
    node: {
        id: string;
        bodyUa: IBody;
        bodyRu: IBody;
        bodyEn: IBody;
        cardImg: {
            url: string
        };
        listImg: Array<{url: string}>;
        weight?: number;
        price: number;
        order: boolean;
        hide: boolean;
        position: number;    
    }
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
    }
}

export interface IFilter {
    button: string;
    value: string;
}

export interface ISort {
    key: string;
    value: string;
}