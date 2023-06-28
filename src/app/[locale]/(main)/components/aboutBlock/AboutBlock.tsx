"use client";

import React from "react";

import { useTranslations } from 'next-intl';

import { motion } from "framer-motion";

import { Container, Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import styles from './aboutBlock.module.scss';
import PhotoList from "./PhotoList";

const benefitsItem = [
    "itemA", "itemB", "itemC", "itemD", "itemE", "itemF",
];

const listVariants = {
    visible: (i: number) => ({
        opacity: 1,
        transition: {
            delay: i * 0.5,
        },
    }),
    hidden: { opacity: 0 },
};

const AboutBlock: React.FC = () => {

    const t = useTranslations('about');

    return (
        <Container
            id="about"
            maxWidth="lg"
            className={styles.about}
        >
            <Typography className={styles.about__title}>{t("title")}</Typography>
            <PhotoList />
            <Box maxWidth="md" className={styles.about__box}>
                <Typography className={styles.about__slogan}>
                    Our coffee – Everything matters
                </Typography>
                <Typography className={styles.about__descr}>
                    {t("paragraph_1")}
                </Typography>
                <Typography className={styles.about__descr}>
                    {t("subtitle")}
                </Typography>
                {benefitsItem.map((item, i) => (
                    <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={listVariants}
                        custom={i}
                        viewport={{ amount: 0.3, once: true }}
                        className={styles.about__list}
                    >
                        <DoneIcon />
                        <Box className={styles.about__item}>
                            {t(item)}
                        </Box>
                    </motion.div>
                ))}
                <Typography className={styles.about__descr}                >
                    {t("paragraph_2")}
                </Typography>
                <br />
            </Box>
        </Container>
    );
};

export default AboutBlock;