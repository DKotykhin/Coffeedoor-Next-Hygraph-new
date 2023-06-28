import React from 'react';

import { mainPageMetaData } from "metadata/metadata";

import FirstBlock from './components/firstBlock/FirstBlock';
import InfoBlock from './components/infoBlock/InfoBlock';
import NavigationDrawer from './components/navigationDrawer/NavigationDrawer';
import AboutBlock from './components/aboutBlock/AboutBlock';

import { GetStoreList } from 'service/storeService';

export const metadata = mainPageMetaData;

const Home = async () => {

    const data = await GetStoreList();

    return (
        <>
            <FirstBlock />
            <NavigationDrawer />
            <InfoBlock />
            <AboutBlock />
        </>
    );
};

export default Home;
