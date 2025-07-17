"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionTwoProps {
  children: ReactNode;
}

export default function SectionTwo({ children }: SectionTwoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-wrap justify-center items-center gap-2 p-2">
        {children}
      </div>
    </motion.div>
  );
}
