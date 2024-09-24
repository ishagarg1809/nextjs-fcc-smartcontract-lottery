// have a function to enter the lottery
import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants/index.js"
import { useEffect, useState } from "react"
import { useNotification } from "@web3uikit/core"

export default function LotteryEntrance() {
    const { chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = chainIdHex ? parseInt(chainIdHex) : 31337
    console.log(`chainId: ${chainId}`)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    console.log(`Raffle Address: ${raffleAddress}`)

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        error: enterRaffleError,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })
    console.log(`Error in enterRaffle(): ${enterRaffleError}`)

    // we can also use this to call functions
    const { runContractFunction: getEntranceFee, error: getEntranceFeeError } = useWeb3Contract({
        contractAddress: raffleAddress,
        abi: abi,
        functionName: "getEntranceFee",
        params: {},
    })
    console.log(`Error in getEntranceFee(): ${getEntranceFeeError}`)

    const { runContractFunction: getNumofPlayers, error: getNumofPlayersError } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumofPlayers",
        params: {},
    })
    console.log(`Error in getNumofPlayers(): ${getNumofPlayersError}`)

    const { runContractFunction: getRecentWinner, error: getRecentWinnerError } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })
    console.log(`Error in getRecentWinner(): ${getRecentWinnerError}`)

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            // whenever we enter the lottery, the num players doesn't update inside here
            // so we move it inside handleSuccess
        }
    }, [isWeb3Enabled])

    async function updateUI() {
        if (raffleAddress) {
            console.log(raffleAddress)
            const entranceFeeFromCall = (
                await getEntranceFee({ onError: (error) => console.log(error) })
            ).toString()
            const numPlayersFromCall = (
                await getNumofPlayers({ onError: (error) => console.log(error) })
            ).toString()
            const recentWinnerFromCall = await getRecentWinner({
                onError: (error) => console.log(error),
            })
            setEntranceFee(entranceFeeFromCall)
            setNumPlayers(numPlayersFromCall)
            setRecentWinner(recentWinnerFromCall)
        }
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "Success",
            message: "Transaction Complete!",
            title: "Txn Notification",
            position: "topR",
        })
    }

    return (
        <div className="px-4">
            Hi from Lottery Entrance!
            {raffleAddress ? (
                <div className="py-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full">
                                {/* we want to add a spin icon */}
                            </div>
                        ) : (
                            <div> Enter Raffle </div>
                        )}
                    </button>
                    <div> Entrance Fee: {entranceFee / 1000000000000000000} ETH</div>
                    <div> Players: {numPlayers} </div>
                    <div> Recent Winner: {recentWinner} </div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
