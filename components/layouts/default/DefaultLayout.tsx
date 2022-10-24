import Head from 'next/head';

export interface IDefaultLayout {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  return (
    <>
      <Head>
        <title>Default layout example</title>
      </Head>
      <main className="min-h-screen flex flex-1 items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
