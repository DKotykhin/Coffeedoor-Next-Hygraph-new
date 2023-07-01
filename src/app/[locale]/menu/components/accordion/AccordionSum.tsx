import React from "react";

import { Typography, Box } from "@mui/material";

import AccordionItem from "./AccordionItem";
import { StyledAccordionDetails } from "./StyledComponents";

import { Languages } from "hooks/useLang";
import { IMenu, IMenuUnit } from "types/menuTypes";

interface IAccordionSum {
    blockItem: IMenu,
    lang: Languages,
}

export const AccordionSum: React.FC<IAccordionSum> = ({ blockItem, lang }) => {
    return (
        <StyledAccordionDetails>
            {blockItem.node.subtitle &&
                <Typography sx={{ ml: 2, fontSize: '18px', fontStyle: 'italic' }}>
                    {blockItem.node.subtitle[lang]}
                </Typography>
            }
            {blockItem.node.items?.map((item: IMenuUnit, i: number) => (
                <Box key={i} sx={{ m: 2 }}>
                    <AccordionItem
                        item={item}
                        lang={lang}
                    />
                </Box>
            ))}
        </StyledAccordionDetails>
    );
};
