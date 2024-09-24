import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery!</h1>
            {/* moralisAuth = false because we're not trying to connect to the server */}
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
