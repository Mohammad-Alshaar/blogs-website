"use client";
import { motion } from "framer-motion";
import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
export default function SectionOne() {
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
          I AM Muhammad!
        </p>
        <p className="text-3xl md:text-4xl lg:text-6xl text-yellow-950 lg:w-3xl">
          Welcome to My Journey of Discovery and Growth
        </p>
        <p className="text-yellow-950 lg:w-xl">
          A marketing professional passionate about exploring the world,
          embracing technology, enhancing personal growth, and nurturing
          wellness.
        </p>
      </div>
    </motion.div>
  );
}
