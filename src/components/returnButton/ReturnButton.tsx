"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';

import { Box, Typography } from "@mui/material";

import { useLang } from "hooks/useLang";

import styles from "./ReturnButton.module.scss";

const ReturnButton: React.FC = () => {

    const t = useTranslations("thanks");
    const lang = useLang();

    return (
        <Box className={styles.return}>
            <Link href={`/${lang}`}>
                <Typography className={styles.return_link}>{t("button")}</Typography>
            </Link>
        </Box>
    );
};

export default ReturnButton;
