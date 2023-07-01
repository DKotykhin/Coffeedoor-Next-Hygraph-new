"use client";

import React, { useState } from "react";

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from "next/image";

import { List, ListItem } from "@mui/material";
import { Box, Drawer, Divider, Link as MuiLink } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { langButtons, useLang } from 'hooks/useLang';
import { GroupList } from "types/storeTypes";

import styles from './navigationDrawer.module.scss';

interface IDrawerTitle {
    title: string;
    id: string
};

const catalogTitleList: IDrawerTitle[] = [
    { title: "titleA", id: GroupList.coffee },
    { title: "titleB", id: GroupList.tea },
    { title: "titleE", id: GroupList.jam },
    { title: "titleC", id: GroupList.mills },
    { title: "titleD", id: GroupList.accessories },
];
const homePageTitleList: IDrawerTitle[] = [
    { title: "titleX", id: "#about" },
    { title: "titleY", id: "#footer" },
];

const NavigationDrawer: React.FC = () => {

    const [state, setState] = useState(false);
    const t = useTranslations('first');
    const lang = useLang();
    const router = useRouter();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };

    return (
        <Box className={styles.drawer}>
            <MenuIcon
                className={styles.drawer__icon}
                onClick={toggleDrawer(true)}
            />
            <Drawer anchor="right" open={state} onClick={toggleDrawer(false)}>
                <Box className={styles.drawer__box}>
                    <MuiLink href="#first">
                        <Image
                            src={"/webp/logo_192x192.webp"}
                            alt="logo Coffeedoor"
                            width={100}
                            height={100}
                            blurDataURL={"/webp/logo_192x192.webp"}
                            placeholder={'blur'}
                        />
                    </MuiLink>
                    <Divider sx={{ mt: 2 }} />
                    <List className={styles.drawer__items}>
                        {catalogTitleList.map((text) => (
                            <ListItem key={text.id} disablePadding>
                                <MuiLink
                                    className={styles.drawer__item}
                                    href={'#' + text.id}
                                >
                                    {t(text.title)}
                                </MuiLink>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List className={styles.drawer__items}>
                        {homePageTitleList.map((text) => (
                            <ListItem key={text.id} disablePadding>
                                <MuiLink
                                    className={styles.drawer__item}
                                    href={text.id}
                                >
                                    {t(text.title)}
                                </MuiLink>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List className={styles.drawer__items}>
                        <Link href={`/${lang}/menu`} style={{ textDecoration: 'none' }}>
                            <ListItem className={styles.drawer__item}>
                                {t("link_2")}
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <Box className={styles.lang__box}>
                        {langButtons.map(item => (
                            <Box
                                key={item.key}
                                onClick={() => router.push(`/${item.key}`)}
                                className={(lang === item.key) ? styles.lang__button_active : styles.lang__button}
                            >
                                {item.label}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default NavigationDrawer;