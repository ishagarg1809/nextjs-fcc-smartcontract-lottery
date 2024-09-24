import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()
    
    useEffect(() => {
        // if we're already connected to web3, then do nothing
        if(isWeb3Enabled) return
        // else automatically call web3
        // enableWeb3()
        // but now this is gonna call web3 even when we dont hit the connect button
        // and we will have to connect to the wallet again
        if (typeof window !== "undefined") {
            if(window.localStorage.getItem("connected")) {
                enableWeb3()
                // now whenever we refresh we don't have to click on connect button
                // it'll automatically connect with the account without manually approving 
            }
        }
    }, [isWeb3Enabled])

    // useEffect for disconnecting
    // if we disconnect, we don't want it to pop up again and again
    // without hitting the connect button
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if(account == null) {
                // they've disconnected
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found!")
            }
        })
    }, [])

    return (<div> 
        {/* we want to see if an account is connected */}
        {account ? 
        (
            // we want to only display a part of the address so we use slice
            <div> Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>
        ) : (
            <button onClick={async () => {
                await enableWeb3()
                // we're gonna make it remember we're connected
                // we're making a new key-value pair inside Inspect > Application > localStorage
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("connected", "injected")
                }
            }}
            disabled={isWeb3EnableLoading}
            > Connect </button>
        )}
    </div>)
}
