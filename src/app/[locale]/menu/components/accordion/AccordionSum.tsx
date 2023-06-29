import React from "react";

import { Typography, Box } from "@mui/material";

import AccordionItem from "./AccordionItem";
import { StyledAccordionDetails } from "./StyledComponents";

import { IBody, IItem } from "types/menuTypes";

interface IAccordionSum {
    blockItem: IItem
}

export const AccordionSum: React.FC<IAccordionSum> = ({ blockItem }) => {
    return (
        <StyledAccordionDetails>
            {blockItem.subtitle &&
                <Typography sx={{ ml: 2, fontSize: '18px', fontStyle: 'italic' }}>
                    {blockItem.subtitle}
                </Typography>
            }
            {blockItem.body?.map((item: IBody, i: number) => (
                <Box key={i} sx={{ m: 2 }}>
                    <AccordionItem
                        {...item} />
                </Box>
            ))}
        </StyledAccordionDetails>
    );
};
