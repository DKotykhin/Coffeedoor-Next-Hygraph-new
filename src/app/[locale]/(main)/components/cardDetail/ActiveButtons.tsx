import { useState } from "react";
import { useTranslations } from 'next-intl';

import { Button, Typography } from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useBasketStore } from "../../store";

import { IBody, ICard } from "types/storeTypes";
import { IBasket } from "types/basketTypes";

import styles from './activeButtons.module.scss';

interface IActiveButtons {
    item: ICard;
    body: IBody;
    closeModal: () => void;
}

const ActiveButtons: React.FC<IActiveButtons> = ({ item, body, closeModal }) => {
    const { id, price, weight, cardImg } = item.node;
    const { title, name } = body;

    const [quantity, setQuantity] = useState<number>(1);
    
    const t = useTranslations("card");
    const addItem = useBasketStore(state => state.addItem);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleBasket = () => {
        closeModal();
        const fullData: IBasket = {
            title,
            name,
            price,
            weight,
            quantity,
            image: cardImg.url,
            id
        };
        // console.log(fullData);
        addItem(fullData);
    };

    return (
        <Typography className={styles.buttons}>
            <RemoveCircleOutlineIcon
                className={styles.buttons__remove}
                onClick={handleDecrement}
            />
            {quantity}
            <AddCircleOutlineIcon
                className={styles.buttons__add}
                onClick={handleIncrement}
            />
            <Button className={styles.buttons__submit} onClick={handleBasket}>
                {t("button_2")}
            </Button>
        </Typography>
    );
};

export default ActiveButtons;
