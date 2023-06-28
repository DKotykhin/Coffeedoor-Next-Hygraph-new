import React from 'react';

import { mainPageMetaData } from "metadata/metadata";
import FirstBlock from './components/firstBlock/FirstBlock';
import InfoBlock from './components/infoBlock/InfoBlock';
import NavigationDrawer from './components/navigationDrawer/NavigationDrawer';

export const metadata = mainPageMetaData;

export default function Home() {

  return (
    <>
      <FirstBlock />
      <NavigationDrawer />
      <InfoBlock />
    </>
  );
}
