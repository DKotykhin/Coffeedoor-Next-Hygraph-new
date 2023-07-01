import React from 'react';
import { Suspense } from "react";

import MenuHeader from './components/menuHeader/MenuHeader';
import AccordionComponent from './components/accordion/AccordionComponent';

import { menuPageMetaData } from "metadata/metadata";
import { GetMenuList } from 'service/menuService';
import Loading from '../loading';

export const metadata = menuPageMetaData;

const MenuPage: React.FC = async () => {

    const data = await GetMenuList();

    return (
        <Suspense fallback={<Loading />}>
            <MenuHeader />
            <AccordionComponent menulist={data.menuList.edges} />
        </Suspense>
    );
};

export default MenuPage;