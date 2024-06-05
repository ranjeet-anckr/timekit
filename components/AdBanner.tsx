"use client";

import React, { useEffect } from "react";

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
    const adsbygoogle = window.adsbygoogle || [];
    try {
      adsbygoogle.push({});
    } catch (error) {
      console.error('Adsbygoogle error:', error);
    }

    // Cleanup function to run when component unmounts or before re-running the effect
    return () => {
      // This attempts to remove the last ad from the adsbygoogle array to prevent duplication
      adsbygoogle.pop();
    };
  }, []); // Dependencies array is empty, meaning this runs once on mount and once on unmount

  return (
    <ins className="adsbygoogle"
         style={{ display: "inline-block", width: "728px", height: "90px" }}
         data-ad-client="ca-pub-6617299272110261"
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive={dataFullWidthResponsive.toString()}></ins>
  );
};

export default AdBanner;
