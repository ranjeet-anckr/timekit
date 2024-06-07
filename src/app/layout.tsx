import './globals.css';

import { cookies } from 'next/headers';
import classNames from 'clsx';

import ThemeSetter from '~/components/ThemeSetter';
import Fonts from '~/components/Fonts';

import configuration from '~/configuration';
import AdSense from 'components/AdSense';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={configuration.site.locale} className="">
      <head>
        <AdSense pId={'pub-6617299272110261'} />
      </head>
      <Fonts />
      <ThemeSetter />

      <body>{children}</body>
    </html>
  );
}

// function getClassName() {
//   const themeCookie = cookies().get('theme')?.value;
//   const theme = themeCookie ?? configuration.theme;
//   const dark = theme === 'light';

//   return classNames({
//     dark,
//   });
// }

export const metadata = {
  title: configuration.site.name,
  description: configuration.site.description,
  metadataBase: new URL(configuration.site.siteUrl!),
  openGraph: {
    url: configuration.site.siteUrl,
    siteName: configuration.site.siteName,
    description: configuration.site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: configuration.site.name,
    description: configuration.site.description,
    creator: configuration.site.twitterHandle,
  },
  icons: {
    icon: '/assets/images/favicon/favicon.svg',
    shortcut: '/shortcut-icon.png',
    apple: '/assets/images/favicon/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

export const viewport = {
  themeColor: configuration.site.themeColor,
};
