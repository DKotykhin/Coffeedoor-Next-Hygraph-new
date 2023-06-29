import { Metadata } from "next";

export const generalMetaData: Metadata = {
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#000000",
    authors: [
        {
            name: "Dmytro Kotykhin",
            url: "https://dmytro-kotykhin.space",
        },
    ],
};

export const mainPageMetaData: Metadata = {
    title: "CoffeeDoor - кав'ярня та магазин свіжообсмаженої кави",
    description:
    "CoffeeDOOR – це кавовий бренд, який по'єднує в собі свіжообсмажену каву рівня Speciality, кращі кавові технології, стильний дизайнерський інтер'єр, швидкий і дружній сервіс",
    keywords: [
        "кава в зернах, кавомолка, пуровер, чай Soho, свыжообсмажена кава, купити каву в зернах",
    ],
    metadataBase: new URL("https://i.ibb.co"),
    openGraph: {
        type: "website",
        url: "https://www.luckycat.pp.ua",
        title: "CoffeeDoor - кав'ярня та магазин свіжообсмаженої кави",
        description:
            "CoffeeDOOR – це кавовий бренд, який по'єднує в собі свіжообсмажену каву рівня Speciality, кращі кавові технології, стильний дизайнерський інтер'єр, швидкий і дружній сервіс",
        images: ["/F6MJ8zr/logo512.webp"],
    },
    icons: {
        icon: '/icon_32.webp',
        apple: '/apple-icon.png',        
    },
};

export const menuPageMetaData: Metadata = {
    title: "Меню кав'ярні",
    description:
        "Пропонуємо напої зі свіжообсмаженої кави та чаї за власними рецептами",
    keywords: [
        "еспресо, допіо, капучино, крафтовий чай, зелений чай, капуоранж",
    ],
    metadataBase: new URL("https://i.ibb.co"),
    openGraph: {
        type: "website",
        url: "https://www.luckycat.pp.ua/menu",
        title: "Меню кав'ярні",
        description:
            "Пропонуємо напої зі свіжообсмаженої кави та чаї за власними рецептами",
        images: ["/x7YYbNk/logo-1285x670.jpg"],
    },
    icons: {
        icon: '/icon_32.webp',
        apple: '/apple-icon.png',        
    },
};

export const thanksPageMetaData: Metadata = {
    title: "Дякуємо за замовлення",
    description: "Сторінка успішного замовлення в онлайн магазині",
    icons: {
        icon: '/icon_32.webp',
        apple: '/apple-icon.png',        
    },
};
