'use client';

import React, { useEffect } from 'react';

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
  useEffect(() => {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    try {
      (window as any).adsbygoogle.push({});
    } catch (error) {
      console.error('Adsbygoogle error:', error);
    }
    return () => {
      if (
        (window as any).adsbygoogle &&
        (window as any).adsbygoogle.length > 0
      ) {
        (window as any).adsbygoogle.pop();
      }
    };
  }, []);

  return (
    <ins
      className="adsbygoogle "
      style={{ display: 'inline-block', width: '46px', height: '90px' }}
      data-ad-client="ca-pub-6617299272110261"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
};

export default AdBanner;
