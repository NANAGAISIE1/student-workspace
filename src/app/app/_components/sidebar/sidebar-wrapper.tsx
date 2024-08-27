"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "./use-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarWrapper = ({ children }: Props) => {
  const { isSidebarOpen } = useSidebarStore((state) => state);

  const sidebarVariants = {
    open: { width: "18rem", x: 0 },
    closed: { width: "0", x: "-18rem" },
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
        className="fixed left-0 top-0 flex h-screen flex-col space-y-2 overflow-hidden border-r bg-background py-2"
      >
        {children}
      </motion.aside>
    </AnimatePresence>
  );
};

export default SidebarWrapper;
