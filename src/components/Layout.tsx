import React, { PropsWithChildren } from "react";
import Header from "./Header";
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
      <div className="max-w-3xl mx-auto">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};
export default Layout;
