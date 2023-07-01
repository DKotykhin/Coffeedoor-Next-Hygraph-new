import React from 'react';
import Image from "next/image";

import { Box, Modal } from '@mui/material';

import { IPhotoData } from '../photoData';

import styles from './photoModal.module.scss';

interface IPhotoModal {
    image: IPhotoData;
    open: boolean;
    handleClose: () => void;
}

const PhotoModal: React.FC<IPhotoModal> = ({ image, open, handleClose }) => {

    const { img, alt, portrait } = image;

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.photoModal} sx={portrait ? { width: 600 } : { width: 900 }}>
                <Box onClick={handleClose} className={styles.close}>&times;</Box>
                <Image
                    src={img}
                    alt={alt}
                    placeholder="blur"
                />
            </Box>
        </Modal>
    );
};

export default PhotoModal;