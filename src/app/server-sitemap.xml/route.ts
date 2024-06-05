import { join } from 'path';
import { getServerSideSitemap } from 'next-sitemap';
import configuration from '~/configuration';

const siteUrl = configuration.site.siteUrl as string;

if (!siteUrl) {
  throw new Error(`Invalid "siteUrl", please fix in configuration.ts`);
}

export async function GET() {
  const urls = getSiteUrls();

  return getServerSideSitemap(urls);
}

function getSiteUrls() {
  const urls = ['', 'faq', 'pricing'];

  return urls.map((url) => {
    return {
      loc: join(siteUrl, url),
      lastmod: new Date().toISOString(),
    };
  });
}
