"use client";

import Script from "next/script";

declare global {
  interface Window {
    klaviyo?: unknown;
    _klOnsite?: unknown[];
  }
}

export default function KlaviyoScript() {
  const publicKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;

  if (!publicKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("KlaviyoScript: NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY is not set");
    }
    return null;
  }

  return (
    <>
      <Script
        id="klaviyo-onsite"
        strategy="afterInteractive"
        src={`https://static.klaviyo.com/onsite/js/${publicKey}/klaviyo.js?company_id=${publicKey}`}
      />
      <Script
        id="klaviyo-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,
        }}
      />
    </>
  );
}
