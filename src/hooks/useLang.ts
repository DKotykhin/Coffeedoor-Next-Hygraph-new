import { useLocale } from "next-intl";

// export type Languages = "uk" | "ru" | "en";

export enum Languages {
    "uk" = "uk",
    "ru" = "ru",
    "en" = "en",
}

interface ILangButtons {
    key: Languages;
    label: string;
}

export const langButtons: ILangButtons[] = [
    { key: Languages.uk, label: "Ua" },
    { key: Languages.ru, label: "Ru" },
    { key: Languages.en, label: "En" },
];

export const useLang = (): Languages => {
    const locale = useLocale();

    let lang: Languages;
    switch (locale) {
        case "uk":
            lang = Languages.uk;
            break;
        case "ru":
            lang = Languages.ru;
            break;
        case "en":
            lang = Languages.en;
            break;
        default:
            lang = Languages.uk;
    }

    return lang;
};
