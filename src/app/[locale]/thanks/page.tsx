import React from 'react';
import { Suspense } from "react";

import { thanksPageMetaData } from "metadata/metadata";
import ThanksBlock from './components/ThanksBlock';
import Loading from '../loading';

export const metadata = thanksPageMetaData;

const ThanksPage: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ThanksBlock />
        </Suspense>
    );
};

export default ThanksPage;