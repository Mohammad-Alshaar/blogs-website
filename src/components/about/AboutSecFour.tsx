"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
interface SectionTwoProps {
  children: ReactNode;
}
export default function AboutSecFour({ children }: SectionTwoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-wrap md:flex-nowrap justify-center">
        {children}
        <div
          className="lg:p-30 p-10 flex flex-col gap-4"
          style={{ background: "#d2ccb6" }}
        >
          <p className="text-4xl text-yellow-950">My Blogs Mission</p>
          <p>
            At the heart of this blog is a simple mission: to inspire, educate,
            and connect. As a marketing professional with a passion for travel,
            technology, and wellness, I aim to share valuable insights and
            personal stories that resonate with you.
          </p>
          <p>
            Join me in this journey of discovery as we explore the world,
            embrace change, and strive for a balanced, fulfilling life.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
