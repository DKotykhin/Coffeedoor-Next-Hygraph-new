"use client";

import React from "react";

import { useTranslations } from 'next-intl';
import Link from "next/link";

import { motion } from "framer-motion";

import { Typography, Box, Link as MuiLink } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useLang } from "hooks/useLang";

import styles from './firstBlock.module.scss';

const FirstBlock: React.FC = () => {

    const t = useTranslations('first');
    const lang = useLang();

    return (
        <Box id="first" className={styles.firstBlock}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
            >
                <Typography className={styles.firstBlock__title}>
                    {"CoffeeDoor"}
                </Typography>
                <Typography
                    className={styles.firstBlock__subtitle}
                    component="h3"
                >
                    {"Brew Bar & Coffeeshop"}
                </Typography>
                <Box className={styles.firstBlock__links}>
                    <Box>
                        <MuiLink href="#coffee" className={styles.link_1}>
                            {t("link_1")}
                        </MuiLink>
                    </Box>
                    <Box>
                        <Link href={`/${lang}/menu`} style={{ textDecoration: 'none' }}>
                            <Box className={styles.link_2}>{t("link_2")}</Box>
                        </Link>
                    </Box>
                </Box>
                <ArrowBackIosIcon className={styles.firstBlock__icon} />
            </motion.div>
        </Box>
    );
};

export default FirstBlock;