"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Typography, Box } from "@mui/material";

import sorry from '/public/webp/sorry_1.webp';

import styles from "./error.module.scss";

const Error: React.FC = () => {

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
                Page not found...
            </Typography>
            <Link href={`/`}>
                <Typography className={styles.return_link}>Main Page</Typography>
            </Link>
        </Box>
    );
};

export default Error;
