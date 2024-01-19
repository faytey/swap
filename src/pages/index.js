"use client";
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
import { useEffect, useState } from "react";
import { ethers, Web3Provider } from "ethers";
import { useRouter } from "next/router";

const Home = () => {
  const [oldTokenName, setOldTokenName] = useState("");
  const [balanceOf, setBalanceOf] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [newTokenName, setNewTokenName] = useState("");
  const [streetBalanceOf, setStreetBalanceOf] = useState(0);
  const [streetSymbol, setStreetSymbol] = useState("");
  const { address } = useAccount();

  const mainStContract = {
    address: "0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
    abi: prevAbi,
  };

  const streetContract = {
    address: "0xfD27B2De705Ee9d3FDb684BD69e1782D91BCbac3",
    abi: newAbi,
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
        args: [address],
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

  useEffect(() => {
    setOldTokenName(readData?.[0]?.result);
    setBalanceOf(readData?.[1]?.result);
    setSymbol(readData?.[2]?.result);
    setNewTokenName(readData?.[4]?.result);
    setStreetBalanceOf(readData?.[5]?.result);
    setStreetSymbol(readData?.[6]?.result);
  }, []);

  const balances = String(balanceOf);
  const streetBalances = String(streetBalanceOf);

  const balance = (Number(balances) / 1000000000).toLocaleString();
  const balanceTwo = (Number(streetBalances) / 1000000000).toLocaleString();

  const { config } = usePrepareContractWrite({
    address: "0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
    abi: prevAbi,
    functionName: "approve",
    args: ["0x39CE211F00b78b934279364a696ab6A6c812Bb78", 1000000000000000],
  });

  const { data, isLoading: writeLoad, write } = useContractWrite(config);

  const handleApprove = (e) => {
    e.preventDefault();
    write?.();
    console.log("it's approving");
  };

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: data?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success Message: ", data);
      // convertWrite?.();
    },
  });

  const { config: convert } = usePrepareContractWrite({
    address: "0x39CE211F00b78b934279364a696ab6A6c812Bb78",
    abi: converter,
    functionName: "convert",
  });

  const {
    data: convertData,
    isLoading: convertLoad,
    write: convertWrite,
  } = useContractWrite(convert);

  const handleConvert = (e) => {
    e.preventDefault();
    console.log("it's converting");
  };

  const { data: convertWaitData, isLoading: convertLoading } =
    useWaitForTransaction({
      hash: convertData?.hash,

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
            Your {oldTokenName} token balance is {balance} {symbol}
          </div>
          <div className="flex flex-col items-center space-y-4">
            Your {newTokenName} token balance is {balanceTwo} {streetSymbol}
          </div>
          <div className="flex flex-col items-center space-y-4"></div>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:cursor-pointer px-8 py-4 rounded-full transition duration-300 ease-in-out"
            onClick={handleApprove}
          >
            {writeLoad || loadWaitData ? "Approving" : "Approve"}
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:cursor-pointer px-8 py-4 rounded-full transition duration-300 ease-in-out"
            onClick={handleConvert}
          >
            {convertLoad || convertLoading ? "Converting" : "Convert Tokens"}
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
