import { useTranslations } from 'next-intl';

import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import { ListItem, List, ListItemIcon, Link } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import ImageSwiper from "./ImageSwiper";
import ActiveButtons from "./ActiveButtons";
import { IBody, ICard } from "types/storeTypes";

import styles from './detailedCard.module.scss';

interface IDetailedCard {
    item: ICard;
    body: IBody;
    openModal: boolean;
    closeModal: () => void;
}

const DetailedCard: React.FC<IDetailedCard> = ({
    item,
    body,
    openModal,
    closeModal,
}) => {
    const { price, weight, listImg } = item.node;
    const {
        name,
        title,
        sort,
        tm,
        description,
        country,
        textA,
        textB,
        textList,
        link
    } = body;

    const t = useTranslations("card");

    const handleClose = () => {
        closeModal();
    };

    return (
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
                <Box className={styles.modal}>
                    <CloseIcon
                        className={styles.modal__close}
                        onClick={handleClose}
                    />
                    <Box className={styles.modal__box}>
                        <ImageSwiper img={listImg} alt={name} />
                        <Box className={styles.modal__textBlock}>
                            <Typography sx={listImg.length > 1 ? { mt: 3 } : { mt: 2 }} variant="h6" component="h2">
                                {title} {name}
                            </Typography>
                            <Typography className={styles.card__price}>
                                {price}
                                {t("currency")}
                            </Typography>
                            <ActiveButtons item={item} body={body} closeModal={handleClose} />
                            <Box>
                                {weight && (
                                    <Typography variant="body2">
                                        {t("weight")}
                                        {weight}{t("unit")}
                                    </Typography>
                                )}
                                {sort && <Typography variant="body2">{sort.key}{": "}{sort.value}</Typography>}
                                {tm && (
                                    <Typography variant="body2">
                                        {t("made")}
                                        {tm}
                                    </Typography>
                                )}
                                {country && (
                                    <Typography variant="body2">
                                        {t("country")}
                                        {country}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Typography className={styles.card__description}>
                        {description}
                    </Typography>
                    {textA?.map((item: string, i: number) => (
                        <Typography key={i} variant="body2" sx={{ textAlign: 'justify' }}>
                            {item}
                        </Typography>
                    ))}
                    <List className="list">
                        {textList?.map((item: string, i: number) => (
                            <ListItem disablePadding key={i}>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <Typography variant="body2" sx={{ m: 1 }}>
                                    {item}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                    {textB?.map((item: string, i: number) => (
                        <Typography key={i} variant="body2" sx={{ mt: 1 }}>
                            {item}
                        </Typography>
                    ))}
                    {link &&
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {link.title}{": "}
                            <Link href={link.value} target='_blank'>
                                {link.value}
                            </Link>
                        </Typography>
                    }
                </Box>
            </Fade>
        </Modal>
    );
};

export default DetailedCard;
