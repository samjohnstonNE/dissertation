import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks"

const CustomConnect = () => {
    const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
    const { switchNetwork } = useSwitchNetwork();

    // If a wallet is connected, show disconnect and switch network options
    if (address) {
        return (
            <>
                Address: {address}
                <br />
                Chain ID: {chainId}
                <br />

                <button onClick={() => switchNetwork(1)}>
                    Switch to Mainnet
                </button>

                <button onClick={() => switchNetwork(3)}>
                    Switch to Ropsten
                </button>

                <button onClick={() => switchNetwork(4)}>
                    Switch to Rinkeby
                </button>

                <button onClick={disconnectWallet}>
                    Disconnect
                </button>
            </>
        )}

    // If no wallet is connected, show connect wallet options
    return (
        <>
            <button onClick={() => connectWallet("injected")}>
                Connect MetaMask
            </button>
        </>
    )
}