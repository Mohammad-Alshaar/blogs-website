"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionTwoProps {
  children: ReactNode;
}
export default function AboutSecTwo({ children }: SectionTwoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center justify-center gap-4 p-7 flex-wrap">
        {children}
      </div>
    </motion.div>
  );
}
