"use client";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import React from "react";
import { motion } from "framer-motion";
export default function AboutSecOne() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col items-center gap-4 text-center px-2 py-20 md:p-20 lg:p-40">
        <p className="text-yellow-950 text-2xl flex items-center">
          <span className="px-2 text-sm ">
            <AcUnitIcon />
          </span>
          ABOUT ME
        </p>
        <p className="text-3xl md:text-4xl lg:text-6xl text-yellow-950 lg:w-3xl">
          From Marketing Maven to World Explorer
        </p>
        <p className="text-yellow-950 lg:w-xl">
          Hi there! I am Muhammad, a marketing professional with a zest for life
          and an insatiable curiosity for the world. This blog is where my love
          for storytelling, discovery, and personal growth converge. Here, I aim
          to share my journey with you.
        </p>
      </div>
    </motion.div>
  );
}
