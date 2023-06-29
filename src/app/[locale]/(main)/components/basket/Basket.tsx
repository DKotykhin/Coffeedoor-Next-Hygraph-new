import React from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

import { Backdrop, Box, Modal, Typography, Divider, Fade } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
    basketRemoveItems,
    basketAddQuantity,
    basketRemoveQuantity,
    basketSetEmpty,
} from "store/basketSlice";
import { selectBasket } from "store/selectors";

import BasketIcon from "./BasketIcon";
import BasketForm from "./BasketForm";
import { IBasket, IFormData, ITelegramData } from "types/basketTypes";

import styles from "./Basket.module.scss";
import sendToTelegram from "service/sendToTelegram";
import Image from "next/image";

const Basket: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const t = useTranslations("basket");
    const matches = useMediaQuery('(min-width:801px)');

    const { basketdata } = useAppSelector(selectBasket);
    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemove = (basketItem: string): void => {
        dispatch(basketRemoveItems(basketItem));
    };
    const handleDecrement = (basketItem: string): void => {
        dispatch(basketRemoveQuantity(basketItem));
    };
    const handleIncrement = (basketItem: string): void => {
        dispatch(basketAddQuantity(basketItem));
    };

    const onSubmitForm = async (formdata: IFormData): Promise<void> => {
        const telegramData: ITelegramData = {
            formdata,
            basketdata
        };
        const res = await sendToTelegram(telegramData);
        if (res?.ok) {
            dispatch(basketSetEmpty());
            setOpen(false);
            router.push("/thanks");
        }
    };

    return (
        <>
            <BasketIcon handleOpen={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
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
                        {basketdata.length > 0 ? (
                            basketdata.map((item: IBasket, i: number) => (
                                <Box key={i} className={styles.basketModal__box}>
                                    <Box className={styles.basketModal__itemBlock}>
                                        {matches &&
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={70}
                                                height={70}
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
                            {basketdata.reduce(
                                (sum: number, currentValue: { price: number; quantity: number; }) =>
                                    sum +
                                    +currentValue.price * currentValue.quantity,
                                0
                            )}
                            {t("currency")}
                        </Typography>
                        <BasketForm onSubmit={onSubmitForm} />
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Basket;
