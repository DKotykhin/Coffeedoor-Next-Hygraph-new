import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

import { Typography, Button, Box, CardActions } from "@mui/material";
import { Card, CardContent } from "@mui/material";

import DetailedCard from "../cardDetail/DetailedCard";

import { useBasketStore } from "../../store";
import { Languages } from "hooks/useLang";

import { IBody, ICard } from "types/storeTypes";
import { IBasket } from "types/basketTypes";

import styles from "./itemCard.module.scss";

interface IItemCard {
    item: ICard;
    lang: string
}

const ItemCard: React.FC<IItemCard> = ({ item, lang }) => {

    const { id, bodyUa, bodyRu, bodyEn, price, weight, cardImg, order } = item.node;

    let body: IBody;
    switch (lang) {
        case Languages.uk:
            body = bodyUa;
            break;
        case Languages.ru:
            body = bodyRu;
            break;
        case Languages.en:
            body = bodyEn;
            break;
        default:
            body = bodyUa;
    }
    const { title, name, description, sort } = body;

    const [openModal, setOpenModal] = useState(false);
    const t = useTranslations("card");

    const addItem = useBasketStore(state => state.addItem);

    const handleDetail = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    const basketClick = (data: IBasket) => addItem(data);

    return (
        <>
            <DetailedCard
                item={item}
                body={body}
                openModal={openModal}
                closeModal={closeModal}
            />
            <Card raised className={styles.card}>
                <Box onClick={handleDetail} sx={{ cursor: 'pointer' }}>
                    <Image
                        src={cardImg?.url || '/webp/wait_1.webp'}
                        alt={name}
                        width={350}
                        height={350}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        blurDataURL={cardImg?.url || '/webp/wait_1.webp'}
                        placeholder={'blur'}
                    />
                </Box>
                <CardContent className={styles.card__content}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title} {name}
                    </Typography>
                    <Typography className={styles.card__price}>
                        {price}
                        {t("currency")}
                    </Typography>
                    <Typography className={styles.card__description}>
                        {description}
                    </Typography>
                    <Box className={styles.card__boxItems}>
                        {order &&
                            <Typography className={styles.card__order}>
                                {t("order")}
                            </Typography>
                        }
                        {weight &&
                            <Typography className={styles.card__sort}>
                                {t("weight")}
                                {weight}
                                {t("unit")}
                            </Typography>
                        }
                        {sort?.key &&
                            <Typography className={styles.card__sort}>
                                {sort.key}{": "}{sort.value}
                            </Typography>
                        }
                    </Box>
                </CardContent>
                <CardActions className={styles.card__buttons}>
                    <Button
                        className={styles.button__detail}
                        onClick={handleDetail}
                    >
                        {t("button_1")}
                    </Button>
                    <Button
                        className={styles.button__basket}
                        onClick={() =>
                            basketClick({
                                id,
                                title,
                                name,
                                price,
                                weight,
                                image: cardImg.url,
                                quantity: 1,
                            })
                        }
                    >
                        {t("button_2")}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default ItemCard;
