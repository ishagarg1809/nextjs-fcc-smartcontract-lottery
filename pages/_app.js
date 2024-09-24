import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "@web3uikit/core"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
    return (
        // it is the option to hook into our server
        // we dont need it right now
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}
