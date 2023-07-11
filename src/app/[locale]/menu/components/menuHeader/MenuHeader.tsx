"use client";

import React from "react";

import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import { Button, Container, Typography } from '@mui/material';

import { langButtons, useLang } from "hooks/useLang";
import ReturnButton from "components/returnButton/ReturnButton";

import logo from '/public/webp/logo_700x191.webp';

import styles from './menuHeader.module.scss';

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
                    placeholder="blur"
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
                <Button
                    key={item.key}
                    aria-label={item.ariaLabel}
                    onClick={() => router.push(`/${item.key}/menu`)}
                    className={(lang === item.key) ? styles.menu__langButtonActive : styles.menu__langButton}
                >
                    {item.label}
                </Button>
            ))}
            <ReturnButton />
        </Container>
    );
};

export default MenuHeader;