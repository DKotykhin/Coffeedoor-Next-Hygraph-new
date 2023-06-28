import { useTranslations } from 'next-intl';

import { Typography } from "@mui/material";

import { IBody } from "types/menuTypes";

const AccordeonItem: React.FC<IBody> = (item) => {

    const t = useTranslations("menu");

    return (
        <>
            <Typography
                sx={{ fontWeight: 700, fontSize: 18 }}
            >
                {item.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                {item.description}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
                {item.price}
                {t("currency")}
            </Typography>
        </>
    );
};

export default AccordeonItem;