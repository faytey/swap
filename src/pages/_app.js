import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [bsc, bscTestnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       http: "https://bsc-dataseed.binance.org/",
  //     }),
  //   }),
  // ]
);
const { connectors } = getDefaultWallets({
  appName: "My Swap App",
  projectId: "ba5022e3d5959b0901411949b04d2b3b",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
