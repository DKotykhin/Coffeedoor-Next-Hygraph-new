"use client";

import React from "react";

import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import { Box, Container, Typography } from '@mui/material';

import styles from './menuHeader.module.scss';
import { langButtons, useLang } from "hooks/useLang";
import ReturnButton from "components/returnButton/ReturnButton";

const MenuHeader: React.FC = () => {
    const t = useTranslations("menu");

    const lang = useLang();

    const router = useRouter();

    return (
        <Container maxWidth="md" className={styles.menu}>
            <Link href={`/${lang}`}>
                <Image
                    src={"/webp/logo_700x191.webp"}
                    alt="logo Coffeedoor"
                    width={700}
                    height={191}
                    priority={true}
                    className={styles.menu__image}
                />
            </Link>
            <Typography className={styles.menu__title} component="h2">
                {t("title")}
            </Typography>
            <Typography className={styles.menu__subtitle} component="h3">
                {t("subtitle")}
            </Typography>
            {langButtons.map(item => (
                <Box
                    key={item.key}
                    onClick={() => router.push(`/${item.key}/menu`)}
                    className={(lang === item.key) ? styles.menu__langButtonActive : styles.menu__langButton}
                >
                    {item.label}
                </Box>
            ))}
            <ReturnButton />
        </Container>
    );
};

export default MenuHeader;