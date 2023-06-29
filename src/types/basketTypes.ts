export interface IBasket {
    title: string;
    name: string;
    price: number;
    quantity: number;
    weight?: number;
    image: string;
    id: string;
}

export interface IFormData {
    name: string;
    phone: string;
    text: string;
    delivery: string;
}

export interface ITelegramData {
    formdata: IFormData;
    basketdata: IBasket[]
}