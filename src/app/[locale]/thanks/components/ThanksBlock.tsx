"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from "next/image";

import { Container, Typography } from "@mui/material";

import ReturnButton from 'components/returnButton/ReturnButton';

import styles from './thanksBlock.module.scss';

const ThanksBlock: React.FC = () => {

    const t = useTranslations("thanks");

    return (
        <Container maxWidth="md" className={styles.thanks}>
            <Link href={'/'}>
                <Image
                    src={"/webp/logo_700x191.webp"}
                    alt="logo Coffeedoor"
                    width={700}
                    height={191}
                    priority={true}
                    className={styles.thanks__image}
                />
            </Link>
            <Typography component="h1" className={styles.thanks__title}>
                {t("title")}
            </Typography>
            <Typography component="h2" className={styles.thanks__subtitle}>
                {t("subtitle")}
            </Typography>
            <ReturnButton />
        </Container>
    );
};

export default ThanksBlock;