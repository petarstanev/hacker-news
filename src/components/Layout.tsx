import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";
// import Header from "./Header";
import { ScrollProvider } from "@/store/scrollContext";
import Head from "next/head";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header/> */}
      <Navigation />
      <main className="max-w-3xl mx-auto">
        <ScrollProvider>{children}</ScrollProvider>
      </main>
    </>
  );
};
export default Layout;