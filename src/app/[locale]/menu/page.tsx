import React from 'react';

import MenuHeader from './components/menuHeader/MenuHeader';
import AccordionComponent from './components/accordion/AccordionComponent';

import { menuPageMetaData } from "metadata/metadata";
import { GetMenu } from 'service/menuService';

export const metadata = menuPageMetaData;

const MenuPage: React.FC = async () => {

    const data = await GetMenu();

    return (
        <>
            <MenuHeader />
            <AccordionComponent menulist={data.menuList.edges} />
        </>
    );
};

export default MenuPage;