import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

import { Typography, Button, Box } from "@mui/material";
import { Card, CardActions, CardContent } from "@mui/material";

import DetailedCard from "../cardDetail/DetailedCard";

import { useAppDispatch } from "store/hook";
import { basketAddItems } from "store/basketSlice";

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
        case "ua":
            body = bodyUa;
            break;
        case "ru":
            body = bodyRu;
            break;
        case "en":
            body = bodyEn;
            break;
        default:
            body = bodyUa;
    }
    const { title, name, description, sort } = body;

    const [open, setOpen] = useState(false);
    const t = useTranslations("card");
    const dispatch = useAppDispatch();

    const handleDetail = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const basketClick = (data: IBasket) => dispatch(basketAddItems(data));

    return (
        <>
            <DetailedCard
                item={item}
                body={body}
                openModal={open}
                closeModal={closeModal}
            />
            <Card raised className={styles.card}>
                <Image
                    src={cardImg?.url || `/wait_1.webp`}
                    loader={() => cardImg.url}
                    alt={name}
                    width={320}
                    height={320}
                    unoptimized={true}
                    blurDataURL={cardImg.url}
                    placeholder={'blur'}
                />
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
                            <Typography color="#ff0000" sx={{ mb: 1 }}>
                                {t("order")}
                            </Typography>
                        }
                        {weight &&
                            <Typography variant="body2" color="text.secondary">
                                {t("weight")}
                                {weight}
                                {t("unit")}
                            </Typography>
                        }
                        {sort?.key &&
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
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