import Head from "next/head"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children, title = "SunLighter" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Privacy-first employment verification platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">{children}</main>
        <Footer />
      </div>
    </>
  )
}
