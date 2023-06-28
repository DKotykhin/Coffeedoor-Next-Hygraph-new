import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Roboto } from 'next/font/google';

import { generalMetaData } from 'metadata/metadata';
import Footer from 'components/footer/Footer';

import './globals.scss';

const roboto = Roboto({
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'uk' }, { locale: 'ru' }];
}

export const metadata: Metadata = generalMetaData;

export default async function RootLayout({
    children, params: { locale }
}: {
    children: React.ReactNode,
    params: any,
}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning={true}>
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
}
