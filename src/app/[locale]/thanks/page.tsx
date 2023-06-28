import React from 'react';

import { thanksPageMetaData } from "metadata/metadata";
import ThanksBlock from './components/ThanksBlock';

export const metadata = thanksPageMetaData;

const ThanksPage: React.FC = () => {
    return (
        <ThanksBlock />
    );
};

export default ThanksPage;