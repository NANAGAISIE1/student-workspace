"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSidebarStore } from "./use-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarWrapper = ({ children }: Props) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  const sidebarVariants = {
    open: { width: "15rem", x: 0 },
    closed: { width: "0", x: "-15rem" },
  };

  return (
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
      className="fixed top-0 left-0 h-screen border-r bg-background flex flex-col space-y-2 overflow-hidden pb-2"
    >
      {children}
    </motion.aside>
  );
};

export default SidebarWrapper;
