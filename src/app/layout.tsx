import { ReactNode } from "react";

import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { generalMetaData } from 'metadata/metadata';
import GoogleAnalytics from "utils/GoogleAnalytics";

import './globals.scss';

const roboto = Roboto({
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

export const metadata: Metadata = generalMetaData;

export default async function RootLayout({
    children, params: { locale }
}: {
    children: ReactNode,
    params: { locale: string },
}) {

    return (
        <html lang={locale} suppressHydrationWarning={true}>
            <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_DATA_ID || ""} />
            <body className={roboto.className}>
                {children}
            </body>
        </html>
    );
};
