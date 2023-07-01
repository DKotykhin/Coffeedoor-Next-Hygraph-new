import { useTranslations } from 'next-intl';

import { Typography } from "@mui/material";

import { IMenuUnit } from "types/menuTypes";
import { Languages } from 'hooks/useLang';

interface IAccordionItem {
    item: IMenuUnit,
    lang: Languages,
}

const AccordionItem: React.FC<IAccordionItem> = ({ item, lang }) => {

    const t = useTranslations("menu");

    return (
        <>
            <Typography
                sx={{ fontWeight: 700, fontSize: 18 }}
            >
                {item.name[lang]}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                {item.description?.[lang]}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
                {item.price}
                {t("currency")}
            </Typography>
        </>
    );
};

export default AccordionItem;