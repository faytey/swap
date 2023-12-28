// pages/index.js

import Layout from "../components/Layout";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Layout title="Cloud-Based Science Labs">
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
          Swap your legacy A tokens for B tokens
        </motion.p>
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Enter Token A"
              className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring focus:border-purple-600 transition duration-300 w-full"
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Enter Token B"
              className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring focus:border-purple-600 transition duration-300 w-full"
            />
          </div>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Explore Labs
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
