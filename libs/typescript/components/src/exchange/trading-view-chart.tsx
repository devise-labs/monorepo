'use client'
import { useEffect, useRef } from '@definelabs/lib-deps-next/react';

const CONTAINER_ID = "tradingview_d3c5c";
let tvScriptLoadingPromise: Promise<void> | undefined;

export function TradingViewWidget() {
  const onLoadScriptRef = useRef<() => void>();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;
      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = import('./tv').then(mod => mod.load());
      }
      /*
      if (!tvScriptLoadingPromise) {
        window.onunhandledrejection = e => {
          console.log('got rejection', e);
        };
        tvScriptLoadingPromise = new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }
      */

      tvScriptLoadingPromise.then(() => {onLoadScriptRef.current && onLoadScriptRef.current()});

      return () => { onLoadScriptRef.current = undefined; }

      function createWidget() {
        console.log('creating widget!');
        const tv = (window as any).TradingView;
        console.log(tv);
        if (document.getElementById(CONTAINER_ID) && tv) {
          new tv.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: CONTAINER_ID,
          });
        }
      }
    },
    []
  );

  return <div id={CONTAINER_ID} />
}
