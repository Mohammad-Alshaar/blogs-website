"use client";
import React from "react";
import { motion } from "framer-motion";
export default function SectionThree() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-30 text-center flex flex-col items-center justify-center gap-7 px-2">
        <p className="text-3xl md:text-4xl lg:text-6xl text-yellow-950">
          What Readers Say
        </p>
        <p className="lg:w-1/2">
          &quot;Muhammad blog is a treasure trove of inspiration and insight.
          His travel stories transport you to new worlds, while his tech tips
          and wellness advice have genuinely improved my daily routine. I always
          look forward to his latest posts. It is like getting a dose of
          motivation straight to my inbox!&quot;
        </p>
        <p className="text-yellow-950">Emily Thompson</p>
      </div>
    </motion.div>
  );
}
