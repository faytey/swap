import Head from "next/head";

const Layout = ({ children, title }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
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
