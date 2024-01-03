import { ConnectButton } from "@rainbow-me/rainbowkit";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import prevAbi from "../utils/oldAbi.json";
import newAbi from "../utils/abi.json";
import { useAccount, useContractReads } from "wagmi";

const Home = () => {
  const { address } = useAccount();

  const mainStContract = {
    address: "0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
    abi: prevAbi,
  };

  const {
    data: readData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...mainStContract,
        functionName: "name",
      },
      {
        ...mainStContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...mainStContract,
        functionName: "symbol",
      },
    ],
  });

  return (
    <Layout title="Token Swap">
      <div className="container pt-5 flex justify-end">
        <ConnectButton />
      </div>
      <div className="container mx-auto pt-20 text-center">
        <motion.h1
          className="text-5xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Token Swap
        </motion.h1>
        <motion.p
          className="text-lg mb-8 opacity-80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Swap your MainStreet tokens for B tokens
        </motion.p>
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4">
            Your {readData?.[0].result} token balance is{" "}
            {String(readData?.[1].result) ?? "0"} {readData?.[2].result}
          </div>
          <div className="flex flex-col items-center space-y-4"></div>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Convert Your Tokens
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
