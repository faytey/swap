"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import prevAbi from "../utils/oldTokenAbi.json";
import newAbi from "../utils/newTokenAbi.json";
import converter from "../utils/converterAbi.json";
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useState } from "react";
import logo from "../../public/IMG_20240120_111606_344.PNG";
import Image from "next/image";

const Home = () => {
  const [oldTokenName, setOldTokenName] = useState("");
  const [balanceOf, setBalanceOf] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [newTokenName, setNewTokenName] = useState("");
  const [streetBalanceOf, setStreetBalanceOf] = useState(0);
  const [streetSymbol, setStreetSymbol] = useState("");
  const { address, isConnected, isDisconnected } = useAccount();

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
  } = useReadContracts({
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
      {
        ...mainStContract,
        functionName: "allowance",
        args: [address, "0x39CE211F00b78b934279364a696ab6A6c812Bb78"],
      },
    ],
  });

  useEffect(() => {
    console.log("readData:", readData); // Log the readData

    setOldTokenName(readData?.[0]?.result);
    setBalanceOf(readData?.[1]?.result);
    setSymbol(readData?.[2]?.result);
    setNewTokenName(readData?.[4]?.result);
    setStreetBalanceOf(readData?.[5]?.result);
    setStreetSymbol(readData?.[6]?.result);
  }, [readData, balanceOf, streetBalanceOf]);

  const balances = String(balanceOf);
  const streetBalances = String(streetBalanceOf);

  const balance = (Number(balances) / 1000000000).toLocaleString();
  const balanceTwo = (Number(streetBalances) / 1000000000).toLocaleString();

  const { data, isPending, writeContract } = useWriteContract();

  const handleApprove = (e) => {
    e.preventDefault();
    if (String(readData?.[6]?.result) >= balances) {
      convertWrite?.({
        address: "0x39CE211F00b78b934279364a696ab6A6c812Bb78",
        abi: converter,
        functionName: "convert",
      });
      console.log("Converting ....");
    } else {
      writeContract?.({
        address: "0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
        abi: prevAbi,
        functionName: "approve",
        args: [
          "0x39CE211F00b78b934279364a696ab6A6c812Bb78",
          readData?.[1]?.result,
        ],
      });
      console.log("it's approving");
    }
  };

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransactionReceipt({
    hash: data?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success Message: ", data);
      convertWrite?.({
        address: "0x39CE211F00b78b934279364a696ab6A6c812Bb78",
        abi: converter,
        functionName: "convert",
      });
    },
  });

  const {
    data: convertData,
    isPending: convertPending,
    writeContract: convertWrite,
  } = useWriteContract();

  const { data: convertWaitData, isLoading: convertLoading } =
    useWaitForTransactionReceipt({
      hash: convertData?.hash,

      onError(error) {
        console.log("Error Message: ", error);
      },

      onSuccess(data) {
        console.log("Success Message: ", data);
      },
    });

  return (
    <Layout title="Street Token">
      <div className="container pt-5 flex justify-end">
        <ConnectButton />
      </div>
      <div className="container mx-auto pt-10 text-center">
        <motion.div
          className="text-5xl font-bold mb-6 text-gradient flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Image src={logo} width={200} height={200} alt="street swap logo" />
        </motion.div>
        <motion.p
          className="text-lg mb-8 opacity-80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Swap your MAINST tokens for Street tokens
        </motion.p>
        {isDisconnected ? (
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="flex flex-col items-center space-y-4">
              Kindly connect your wallet
            </p>
            <ConnectButton />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="flex flex-col items-center space-y-4">
              Your {oldTokenName} token balance is{" "}
              {isNaN(balance) ? 0 : balance} {symbol}
            </p>
            <p className="flex flex-col items-center space-y-4">
              Your {newTokenName} token balance is {balanceTwo} {streetSymbol}
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:cursor-pointer px-8 py-4 rounded-full transition duration-300 ease-in-out"
              onClick={handleApprove}
            >
              {isPending || convertPending || loadWaitData || convertLoading
                ? "Converting"
                : "Convert Tokens"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
