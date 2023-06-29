import React from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

import { Backdrop, Box, Modal, Typography, Divider, Fade } from "@mui/material";
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

const Basket: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const t = useTranslations("basket");

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
                    <Box sx={{ bgcolor: "background.paper", boxShadow: 24 }} className={styles.modal}>
                        <CloseIcon
                            className={styles.modal_close}
                            onClick={handleClose}
                        />
                        <Typography
                            className={styles.modal_title}
                            component="h2"
                        >
                            {t("title")}
                        </Typography>
                        {basketdata.length > 0 ? (
                            basketdata.map((item: IBasket, i: number) => (
                                <Box key={i}>
                                    <Box className={styles.modal_block}>
                                        <Typography
                                            className={styles.modal_name}
                                        >
                                            {item.title}
                                            {" "}
                                            {item.name}
                                            {item.weight ? `, ${item.weight}${t("weight")}` : ""}
                                        </Typography>
                                        <CloseIcon
                                            className={styles.modal_icon}
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        />
                                    </Box>
                                    <Typography className={styles.modal_price}>
                                        <RemoveCircleOutlineIcon
                                            className={styles.add_remove_icons}
                                            onClick={() =>
                                                handleDecrement(item.id)
                                            }
                                        />{" "}
                                        {item.quantity}{" "}
                                        <AddCircleOutlineIcon
                                            className={styles.add_remove_icons}
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
                                    <Divider sx={{ mt: 1.5 }} />
                                </Box>
                            ))
                        ) : (
                            <Box className={styles.modal_subtitle}>
                                {t("message")}
                            </Box>
                        )}
                        <Typography className={styles.modal_total}>
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
