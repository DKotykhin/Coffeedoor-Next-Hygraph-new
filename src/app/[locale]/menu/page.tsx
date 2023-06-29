import React from 'react';

import MenuHeader from './components/menuHeader/MenuHeader';
import AccordionComponent from './components/accordion/AccordionComponent';

import { menuPageMetaData } from "metadata/metadata";
import { GetMenuList } from 'service/menuService';

export const metadata = menuPageMetaData;

const MenuPage: React.FC = async () => {

    const data = await GetMenuList();

    return (
        <main>
            <MenuHeader />
            <AccordionComponent menulist={data.menuList.edges} />
        </main>
    );
};

export default MenuPage;