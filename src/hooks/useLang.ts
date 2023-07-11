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
    ariaLabel: string;
}

export const langButtons: ILangButtons[] = [
    {
        key: Languages.uk,
        label: "Ua",
        ariaLabel: "Change language to ukrainian",
    },
    { key: Languages.ru, label: "Ru", ariaLabel: "Change language to russian" },
    { key: Languages.en, label: "En", ariaLabel: "Change language to english" },
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
