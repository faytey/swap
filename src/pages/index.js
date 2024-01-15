import { ConnectButton } from "@rainbow-me/rainbowkit";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import prevAbi from "../utils/oldTokenAbi.json";
import newAbi from "../utils/newTokenAbi.json";
import converter from "../utils/converterAbi.json";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const Home = () => {
  const { address } = useAccount();

  const mainStContract = {
    address: "0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
    abi: prevAbi,
  };

  const streetContract = {
    address: "0xfD27B2De705Ee9d3FDb684BD69e1782D91BCbac3",
    abi: newAbi,
  };

  const { config } = usePrepareContractWrite({
    address: "0x39CE211F00b78b934279364a696ab6A6c812Bb78",
    abi: converter,
    functionName: "convert",
  });

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
      {
        ...mainStContract,
        functionName: "decimal",
      },
      {
        ...streetContract,
        functionName: "name",
      },
      {
        ...streetContract,
        functionName: "balanceOf",
      },
      {
        ...streetContract,
        functionName: "symbol",
      },
      {
        ...streetContract,
        functionName: "decimal",
      },
    ],
  });

  const balances = String(readData?.[1]?.result);
  const streetBalances = String(readData?.[5]?.result);

  const balance = (Number(balances) / 1000000000).toLocaleString();
  const balanceTwo = (Number(streetBalances) / 1000000000).toLocaleString();

  const {
    data: writeContract,
    isLoading: writeLoading,
    write,
  } = useContractWrite(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
  };

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: writeContract?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success Message: ", data);
    },
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
          Swap your MainStreet tokens for Street tokens
        </motion.p>
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4">
            Your {readData?.[0].result} token balance is {balance ?? "0"}{" "}
            {readData?.[2].result}
          </div>
          <div className="flex flex-col items-center space-y-4">
            Your {readData?.[4].result} token balance is {balanceTwo ?? "0"}{" "}
            {readData?.[6].result}
          </div>
          <div className="flex flex-col items-center space-y-4"></div>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmit}
          >
            {writeContract || sendWaitData
              ? "Converting"
              : "Convert Your Tokens"}
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
