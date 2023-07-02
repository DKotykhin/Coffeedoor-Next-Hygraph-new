import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";

import { Backdrop, Box, Modal, Typography, Divider, Fade } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import BasketIcon from "./BasketIcon";
import BasketForm from "./BasketForm";
import sendToTelegram from "service/sendToTelegram";
import { useBasketStore } from "../../store";

import { IBasket, IFormData, ITelegramData } from "types/basketTypes";

import styles from "./Basket.module.scss";

const Basket: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const t = useTranslations("basket");
    const matches = useMediaQuery('(min-width:801px)');

    const { basketData, removeItem, quantityDec, quantityInc, setEmpty } = useBasketStore();

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleRemove = (id: string): void => removeItem(id);
    const handleDecrement = (id: string): void => quantityDec(id);
    const handleIncrement = (id: string): void => quantityInc(id);

    const onSubmitForm = async (formData: IFormData): Promise<void> => {
        const telegramData: ITelegramData = {
            formData,
            basketData,
        };
        setLoading(true);
        await sendToTelegram(telegramData)
        .then(() => {
            setEmpty();
            router.push("/thanks");
        })
        .finally(() => {
            setOpenModal(false);
            setLoading(false);
        });       
    };

    return (
        <>
            <BasketIcon handleOpen={handleOpen} />
            <Modal
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box className={styles.basketModal}>
                        <CloseIcon
                            className={styles.basketModal__closeBasket}
                            onClick={handleClose}
                        />
                        <Typography
                            className={styles.basketModal__title}
                            component="h2"
                        >
                            {t("title")}
                        </Typography>
                        <Divider />
                        {basketData.length > 0 ? (
                            basketData.map((item: IBasket, i: number) => (
                                <Box key={i} className={styles.basketModal__box}>
                                    <Box className={styles.basketModal__itemBlock}>
                                        {matches &&
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={70}
                                                height={70}
                                                blurDataURL={item.image || '/webp/wait_1.webp'}
                                                placeholder={'blur'}
                                            />
                                        }
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Box className={styles.basketModal__nameBlock}>
                                                <Typography className={styles.basketModal__itemName}>
                                                    {item.title}
                                                    {" "}
                                                    {item.name}
                                                    {item.weight ? `, ${item.weight}${t("weight")}` : ""}
                                                </Typography>
                                                <CloseIcon
                                                    className={styles.basketModal__removeItem}
                                                    onClick={() =>
                                                        handleRemove(item.id)
                                                    }
                                                />
                                            </Box>
                                            <Typography className={styles.basketModal__price}>
                                                <RemoveCircleOutlineIcon
                                                    className={styles.basketModal__quantityIcons}
                                                    onClick={() =>
                                                        handleDecrement(item.id)
                                                    }
                                                />{" "}
                                                {item.quantity}{" "}
                                                <AddCircleOutlineIcon
                                                    className={styles.basketModal__quantityIcons}
                                                    onClick={() =>
                                                        handleIncrement(item.id)
                                                    }
                                                />
                                                {" x "}
                                                {item.price}
                                                {t("currency")}{" = "}
                                                {item.quantity * item.price}
                                                {t("currency")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ mt: 1 }} />
                                </Box>
                            ))
                        ) : (
                            <Box className={styles.basketModal__subtitle}>
                                {t("message")}
                            </Box>
                        )}
                        <Typography className={styles.basketModal__total}>
                            {t("total")}
                            {basketData.reduce(
                                (sum: number, currentValue: { price: number; quantity: number; }) =>
                                    sum +
                                    +currentValue.price * currentValue.quantity,
                                0
                            )}
                            {t("currency")}
                        </Typography>
                        <BasketForm onSubmit={onSubmitForm} loading={loading}/>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Basket;
