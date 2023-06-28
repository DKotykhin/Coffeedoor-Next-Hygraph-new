import { usePathname } from "next/navigation";

export type Languages = "uk" | "ru" | "en";

export const langButtons = [
    { key: "uk", label: "Ua" },
    { key: "ru", label: "Ru" },
    { key: "en", label: "En" },
];

export const useLang = (): Languages => {
    const pathname = usePathname();
    let lang: Languages;
    switch (true) {
        case pathname.startsWith("/uk"):
            lang = "uk";
            break;
        case pathname.startsWith("/ru"):
            lang = "ru";
            break;
        case pathname.startsWith("/en"):
            lang = "en";
            break;
        default:
            lang = "uk";
    }

    return lang;
};
