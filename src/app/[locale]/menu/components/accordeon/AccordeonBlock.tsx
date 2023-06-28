import React from "react";

import { Typography, Box, AccordionDetails } from "@mui/material";
import { styled } from "@mui/material/styles";

import AccordeonItem from "./AccordeonItem";

import { IBody, IItem } from "types/menuTypes";

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface IBlock {
    blockItem: IItem    
}

export const AccordeonBlock: React.FC<IBlock> = ({ blockItem }) => {
    return (
        <StyledAccordionDetails>
            {blockItem.subtitle &&
                <Typography sx={{ ml: 2, fontSize: '18px', fontStyle: 'italic' }}>
                    {blockItem.subtitle}
                </Typography>
            }
            {blockItem.body?.map((item: IBody, i: number) => (
                <Box key={i} sx={{ m: 2 }}>
                    <AccordeonItem
                        {...item} />
                </Box>
            ))}
        </StyledAccordionDetails>
    );
};
