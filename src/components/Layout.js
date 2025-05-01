import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Lemonade` : 'Lemonade'}</title>
        {description && <meta name="description" content={description} />}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
