import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import { IGroupData } from './CatalogList';
import ItemCard from '../itemCard/ItemCard';
import { useLang } from 'hooks/useLang';

import { ICard } from 'types/storeTypes';

import "swiper/css";
import styles from './cardList.module.scss';
import FilterItems from '../filters/FilterItems';

interface ICardList {
    data: ICard[],
    item: IGroupData,
}

const CardList: React.FC<ICardList> = ({ data, item }) => {

    const { group, title, subtitle, filterArray } = item;
    const [list, setList] = useState<ICard[]>(data);

    const matches = useMediaQuery('(min-width:1250px)');

    const t = useTranslations('catalog');
    const lang = useLang();

    const onSelectSort = (sort: string) => {
        if (sort) {
            if (lang === 'uk') {
                setList(data.filter(item => item.node.bodyUa.sort?.value === sort));
            }
            if (lang === 'ru') {
                setList(data.filter(item => item.node.bodyRu.sort?.value === sort));
            }
            if (lang === 'en') {
                setList(data.filter(item => item.node.bodyEn.sort?.value === sort));
            }
        }
    };

    return (
        <Container id={group} maxWidth="xl" className={styles.cardList} >
                <Typography className={styles.cardList__title}>
                    {t(title)}
                </Typography>
                <Typography className={styles.cardList__subtitle}>
                    {t(subtitle)}
                </Typography>
                {filterArray && (
                    <FilterItems
                        onSelect={onSelectSort}
                        quantity={list ? list.length : null}
                        filterArray={filterArray}
                    />
                )}
                {matches ?
                    <Box className={styles.cardList__grid} >
                        {list?.map((item) =>
                            <ItemCard key={item.node.id} item={item} lang={lang} />)}

                    </Box>
                    :
                    <Swiper
                        slidesPerView={1.1}
                        spaceBetween={15}
                        breakpoints={{
                            600: {
                                slidesPerView: 1.5,
                                threshold: 20
                            },
                            850: {
                                slidesPerView: 2.2,
                                threshold: 20
                            },
                        }}
                        navigation={true}
                        grabCursor={true}
                    >
                        {list?.map((item) => (
                            <SwiperSlide key={item.node.id}>
                                <ItemCard item={item} lang={lang} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
        </Container>
    );
};

export default CardList;