import React from 'react';
import { Suspense } from "react";

import MenuHeader from './components/menuHeader/MenuHeader';
import AccordionComponent from './components/accordion/AccordionComponent';

import { menuPageMetaData } from "metadata/metadata";
import Loading from '../loading';
import { GetMenu } from 'service/menuService';

export const metadata = menuPageMetaData;

const MenuPage: React.FC = async () => {

    const data = await GetMenu();

    return (
        <Suspense fallback={<Loading />}>
            <MenuHeader />
            <AccordionComponent menulist={data.menuList.edges} />
        </Suspense>
    );
};

export default MenuPage;