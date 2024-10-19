"use client";
import { useAnimation, useInView, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

function AOS({ children }: Props) {
  const control = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, scale: 0 },
  };
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      // control.start("hidden");
    }
  }, [control, isInView]);
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      {children}
    </motion.div>
  );
}

export default AOS;
