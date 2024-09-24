import Head from "next/head"
// import ManualHeader from "../components/ManualHeader.jsx"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance.js"

export default function Home() {
    return (
        <div>
            <Head>
                <title> Smart Contract Lottery </title>
                <meta name="description" content="Our Smart Contract Lottery" />
                <link rel="icon" href="favicon.ico" />
            </Head>
            {/* <ManualHeader></ManualHeader> */}
            <Header />
            <LotteryEntrance />
        </div>
    )
}
