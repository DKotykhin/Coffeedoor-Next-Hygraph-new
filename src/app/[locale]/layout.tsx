import { ReactNode } from "react";

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import Footer from 'components/footer/Footer';

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'uk' }, { locale: 'ru' }];
};

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
    };

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </NextIntlClientProvider >
    );
};
