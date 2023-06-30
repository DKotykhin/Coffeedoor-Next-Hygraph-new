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
import logo from '/public/webp/logo_700x191.webp';

const MenuHeader: React.FC = () => {
    const t = useTranslations("menu");

    const lang = useLang();

    const router = useRouter();

    return (
        <Container maxWidth="md" className={styles.menu}>
            <Link href={`/${lang}`}>
                <Image
                    src={logo}
                    alt="logo Coffeedoor"
                    style={{
                        width: '90%',
                        height: 'auto',
                    }}
                    placeholder="blur"
                    blurDataURL={"/webp/logo_700x191.webp"}
                    className={styles.menu__image}
                />
            </Link>
            <Typography className={styles.menu__title}>
                {t("title")}
            </Typography>
            <Typography className={styles.menu__subtitle}>
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