import React from "react";

import { Box, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import { useBasketStore } from "../../store";

import styles from "./basketIcon.module.scss";

const StyledBadge = styled(Badge)`
    & .MuiBadge-badge {
        color: #00a1b6;
        top: 15px;
        border: 2px solid #00a1b6;
        padding: 0 3px;
    }
`;

interface IBasketIcon {
    handleOpen: () => void
}

const BasketIcon: React.FC<IBasketIcon> = ({ handleOpen }) => {

    const basketData = useBasketStore(state => state.basketData);

    const totalQuantity = basketData.reduce(
        (sum: number, currentValue: { price: number; quantity: number; }) => sum + currentValue.quantity,
        0
    );

    return basketData.length > 0 ? (
        <Box className={styles.basketIcon} onClick={handleOpen}>
            <StyledBadge badgeContent={totalQuantity}>
                <ShoppingBasketOutlinedIcon
                    className={styles.basketIcon__icon}
                />
            </StyledBadge>
        </Box>
    ) : null;
};


export default BasketIcon;
