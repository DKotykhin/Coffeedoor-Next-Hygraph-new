"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Typography, Box } from "@mui/material";

import ReturnButton from "components/returnButton/ReturnButton";
import sorry from '/public/webp/sorry_1.webp';

import styles from "./error.module.scss";

const Error: React.FC = () => {

    const t = useTranslations("error");

    return (
        <Box className={styles.error}>
            <Box className={styles.error_image}>
                <Image
                    src={sorry}
                    alt="error"
                    placeholder="blur"
                    width={270}
                    height={270}
                />
            </Box>
            <Typography className={styles.error_title}>
                {t("notFound")}
            </Typography>
            <ReturnButton />
        </Box>
    );
};

export default Error;
