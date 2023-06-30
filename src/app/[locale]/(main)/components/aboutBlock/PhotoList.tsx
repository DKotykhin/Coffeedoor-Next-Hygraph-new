import React from 'react';

import Image, { StaticImageData } from "next/image";

import { ImageList, ImageListItem } from "@mui/material";

import { photoData, IPhotoData } from "./photoData";

const srcset = (image: StaticImageData, width: number, height: number, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
};

const PhotoList = () => {
    return (
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
                    <ImageListItem key={item.id} cols={cols} rows={rows}>
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
                            blurDataURL={item.url}
                            priority={false}
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
};

export default PhotoList;