import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper";

import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import "./imageSwiper.scss";

interface IImageSwiper {
    img: {
        url: string
    }[];
    alt: string
}

const ImageSwiper: React.FC<IImageSwiper> = ({ img, alt }) => {

    return (
        <Box sx={{ width: '100%', maxWidth: '350px' }}>
            {img.length ?
                <Swiper
                    effect={"cube"}
                    pagination={true}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 10,
                        shadowScale: 0.8,
                    }}
                    modules={[EffectCube, Pagination]}
                >
                    {img.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={item.url}
                                loader={() => item.url}
                                alt={alt}
                                width={350}
                                height={350}
                                unoptimized={true}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                :
                <Image
                    src={"/wait_1.webp"}
                    alt={'wait for photo'}
                    width={350}
                    height={350}
                />
            }
        </Box>
    );
};

export default ImageSwiper;
