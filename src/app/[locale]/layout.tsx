import { ReactNode } from "react";
// import ReactGA from "react-ga4";

import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Roboto } from 'next/font/google';

import Footer from 'components/footer/Footer';
import { generalMetaData } from 'metadata/metadata';
import GoogleAnalytics from "utils/GoogleAnalytics";

import './globals.scss';

const roboto = Roboto({
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'uk' }, { locale: 'ru' }];
}

export const metadata: Metadata = generalMetaData;

// const GOOGLE_DATA_ID: string = process.env.NEXT_PUBLIC_GOOGLE_DATA_ID || "";
// ReactGA.initialize(GOOGLE_DATA_ID);

export default async function RootLayout({
    children, params: { locale }
}: {
    children: ReactNode,
    params: { locale: string },
}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning={true}>
            <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_DATA_ID || ""} />
            <body className={roboto.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main className="main">
                        {children}
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
