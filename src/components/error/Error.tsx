"use client";

import React from "react";
import Image from "next/image";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import ReturnButton from "components/returnButton/ReturnButton";

import styles from "./error.module.scss";

const Error: React.FC = () => {
    return (
        <Box className={styles.error}>
            <Box className={styles.error_image}>
                <Image
                    src={"/webp/sorry_1.webp"}
                    alt="error"
                    width={270}
                    height={270}
                    priority={true}
                />
            </Box>
            <Typography className={styles.error_title}>
                Сторінка не знайдена
            </Typography>
            <ReturnButton />
        </Box>
    );
};

export default Error;
