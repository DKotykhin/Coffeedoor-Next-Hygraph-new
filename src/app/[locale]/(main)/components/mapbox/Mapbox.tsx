"use client";

import { useTranslations } from 'next-intl';
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Container, Typography } from "@mui/material";

import styles from './mapbox.module.scss';

const viewport = { latitude: 49.99933, longitude: 36.24208, zoom: 17 };

const Mapbox = () => {

    const t = useTranslations('about');

    return (
        <Container maxWidth='md' className={styles.container}>
            <Typography className={styles.title}>
                {t('location')}
            </Typography>
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={viewport}
                style={{ width: '100%', height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                />
            </Map>
        </Container>
    );
};

export default Mapbox;