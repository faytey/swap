// components/Layout.js

import Head from "next/head";

const Layout = ({ children, title }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-3 bg-gradient-to-tr from-purple-900  to-transparent via-transparent"
        style={{
          animation: "glow 3s linear infinite alternate",
        }}
      ></div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
