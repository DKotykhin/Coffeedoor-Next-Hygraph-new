import React from 'react';

import { mainPageMetaData } from "metadata/metadata";

import FirstBlock from './components/firstBlock/FirstBlock';
import InfoBlock from './components/infoBlock/InfoBlock';
import NavigationDrawer from './components/navigationDrawer/NavigationDrawer';
import AboutBlock from './components/aboutBlock/AboutBlock';
import CatalogList from './components/catalog/CatalogList';
import Spinner from 'components/spinner/Spinner';

import { GetStoreList } from 'service/storeService';
import ScrollButton from 'components/scrollButton/ScrollButton';
import Mapbox from './components/mapbox/Mapbox';

export const metadata = mainPageMetaData;

const Home = async () => {

    const data = await GetStoreList();

    return (
        <>
            <FirstBlock />
            <NavigationDrawer />
            <InfoBlock />
            {data ? <CatalogList data={data} /> : <Spinner />}
            <AboutBlock />
            <Mapbox />
            <ScrollButton />
        </>
    );
};

export default Home;
