import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import PreLoader from "../components/General/PreLoader/PreLoader";
import useFacebook from "../hooks/useFacebook";
import Router from "next/router";
import { VoiceModalProvider } from "../context/VoiceModalContext";
import { CartProvider } from "../context/CartContext";
import AppContainer from "../components/General/AppContainer/AppContainer";
import SideBar from "../components/General/SideBar/SideBar";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState<string[]>(["home"]);
  const router = useRouter();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    const PreLoaderTimeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(PreLoaderTimeout);
  }, []);

  useFacebook();

  const handleSelectTab = (tab: string) => {
    if (!activeTabs.includes(tab)) {
      setActiveTabs((prevTabs) => {
        const newTabs = [...prevTabs, tab];
        if (newTabs.length > 3) {
          newTabs.splice(0, 1); // Remove the oldest tab
        }
        return newTabs;
      });
    }
    router.push(`/${tab}`);
  };

  return (
    <SessionProvider session={session}>
      <VoiceModalProvider>
        <CartProvider>
          {loading && <PreLoader targetRef={logoRef} />}
          <div className="app-container">
            <div className="sidebar">
              <SideBar onSelectTab={handleSelectTab} activeTabs={activeTabs} />

            </div>
            <div className="main-content">
              <AppContainer
                Component={Component}
                pageProps={{ ...pageProps, activeTabs, setActiveTabs }}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
              />
            </div>
          </div>
        </CartProvider>
      </VoiceModalProvider>
    </SessionProvider>
  );
}

export default MyApp;
