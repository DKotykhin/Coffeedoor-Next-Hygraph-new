import { Languages } from "hooks/useLang";

export interface IMenuList {
    menuList: {
        edges: IMenu[];
    };
}

export interface IMenu {
    node: {
        title: ILangUnit;
        subtitle?: ILangUnit;
        items: IMenuUnit[];
        hidden: boolean;
        position: number;
    };
}

export interface IMenuUnit {
    name: ILangUnit;
    description?: ILangUnit;
    price: string;
    hidden: boolean;
}

export interface ILangUnit {
    [Languages.uk]: string;
    [Languages.ru]: string;
    [Languages.en]: string;
}
