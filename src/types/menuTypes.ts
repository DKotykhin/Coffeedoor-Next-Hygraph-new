export interface IMenuList {
    menuList: {
        edges: IMenu[]
    }
}

export interface IMenu {
    node: {
        ua: IItem;
        ru: IItem;
        en: IItem;
        hide: boolean;
        position?: number;
    }
}

export interface IItem {
    title: string;
    subtitle: string;
    body: IBody[];
}

export interface IBody {
    name: string;
    description?: string;
    price: string;
}
