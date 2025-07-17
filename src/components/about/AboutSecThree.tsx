"use client";
import React from "react";
import { motion } from "framer-motion";
export default function AboutSecThree() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex gap-10 items-center justify-center flex-wrap py-30">
        <div className="flex flex-col gap-4 ">
          <div className="text-6xl">15</div>
          <div className="text-yellow-950">Countries Explored</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-6xl">10+</div>
          <div className="text-yellow-950">Years in Marketing</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-6xl">200</div>
          <div className="text-yellow-950">Blog Posts Published</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-6xl">30</div>
          <div className="text-yellow-950">Books Read Annually</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-6xl">3</div>
          <div className="text-yellow-950">Languages Spoken</div>
        </div>
      </div>
    </motion.div>
  );
}
