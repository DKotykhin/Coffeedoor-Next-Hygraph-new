import React, { useState } from 'react';

import Image, { StaticImageData } from "next/image";

import { ImageList, ImageListItem } from "@mui/material";

import { photoData, IPhotoData } from "./photoData";
import PhotoModal from './photoModal/PhotoModal';
import Image_10 from "/public/aboutImages/Coffeedoor_10.webp";

const srcset = (image: StaticImageData, width: number, height: number, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
};

const PhotoList = () => {

    const [openModal, setOpenModal] = useState(false);
    const [currentImage, setCurrentImage] = useState<IPhotoData>({
        id: 1,
        img: Image_10,
        alt: "Coffee",
        bigSize: true,
        portrait: false,
        url: '/aboutImages/Coffeedoor_10.webp',
    });

    const handleClose = () => setOpenModal(false);
    const handleOpen = (data: IPhotoData) => {
        setOpenModal(true);
        setCurrentImage(data);
    };

    return (
        <>
            <PhotoModal
                image={currentImage}
                open={openModal}
                handleClose={handleClose}
            />
            <ImageList
                sx={{
                    height: 800,
                    transform: "translateZ(0)",
                }}
                gap={10}
            >
                {photoData.map((item: IPhotoData) => {
                    const cols = item.bigSize ? 2 : 1;
                    const rows = item.bigSize ? 2 : 1;
                    return (
                        <ImageListItem
                            key={item.id}
                            cols={cols}
                            rows={rows}
                            onClick={() => handleOpen(item)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Image
                                {...srcset(item.img, 250, 200, rows, cols)}
                                src={item.img}
                                alt={item.alt}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                placeholder="blur"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </>
    );
};

export default PhotoList;