"use client";

import React, { useState } from "react";

import { Container, Typography, Accordion, AccordionSummary } from "@mui/material";
import { AccordionProps } from '@mui/material/Accordion';
import { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDown";

import { AccordeonBlock } from "./AccordeonBlock";

import { useLang } from "hooks/useLang";
import { IMenu } from "types/menuTypes";

const StyledAccordion = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
    <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
        color: "#00a1b6",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

interface IAccordeon {
    menulist: IMenu[],
}

const Accordeon: React.FC<IAccordeon> = ({ menulist }) => {
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
                    <AccordeonBlock
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

export default Accordeon;
