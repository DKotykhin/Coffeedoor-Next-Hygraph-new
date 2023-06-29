"use client";

import React, { useState } from "react";

import { Container, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDown";

import { AccordionSum } from "./AccordionSum";
import { StyledAccordion, StyledAccordionSummary } from "./StyledComponents";

import { useLang } from "hooks/useLang";
import { IMenu } from "types/menuTypes";

interface IAccordion {
    menulist: IMenu[],
}

const AccordionComponent: React.FC<IAccordion> = ({ menulist }) => {
    const [expanded, setExpanded] = useState("");
    const lang = useLang();

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : "");
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '50px', marginBottom: '100px' }}>
            {menulist?.map((item: IMenu, i: number) => (
                <StyledAccordion
                    key={i}
                    expanded={expanded === `panel${i}`}
                    onChange={handleChange(`panel${i}`)}
                >
                    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 700, fontSize: 22, mr: 2 }}>
                            {lang === 'uk'
                                ? item.node.ua.title
                                : lang === 'en'
                                    ? item.node.en.title
                                    : item.node.ru.title}
                        </Typography>
                    </StyledAccordionSummary>
                    <AccordionSum
                        blockItem={lang === 'uk'
                            ? item.node.ua
                            : lang === 'en'
                                ? item.node.en
                                : item.node.ru}
                    />
                </StyledAccordion>
            ))}
        </Container>
    );
};

export default AccordionComponent;
