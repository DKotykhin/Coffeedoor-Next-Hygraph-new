import React from 'react';

import { menuPageMetaData } from "metadata/metadata";
import MenuHeader from './components/MenuHeader';

export const metadata = menuPageMetaData;

const MenuPage: React.FC = () => {
    return (
        <main>
            <MenuHeader />
        </main>
    );
};

export default MenuPage;