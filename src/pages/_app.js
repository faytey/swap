import "@/styles/globals.css";
// import "@rainbow-me/rainbowkit/styles.css";
// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { bsc, bscTestnet } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// const { chains, publicClient } = configureChains(
//   [bsc, bscTestnet],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
//   // [
//   //   jsonRpcProvider({
//   //     rpc: (chain) => ({
//   //       http: "https://bsc-dataseed.binance.org/",
//   //     }),
//   //   }),
//   // ]
// );
// const { connectors } = getDefaultWallets({
//   appName: "Street App",
//   projectId: "ba5022e3d5959b0901411949b04d2b3b",
//   chains,
// });
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

const config = getDefaultConfig({
  appName: "Street App",
  projectId: "ba5022e3d5959b0901411949b04d2b3b",
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
