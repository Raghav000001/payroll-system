"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../comp/lib/utils";

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        className={cn(
          "cursor-pointer text-white",
          active === item ? "opacity-100" : "opacity-60"
        )}
      >
        {item}
      </motion.p>
      {active === item && (
        <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="bg-black text-white border border-white/10 rounded-xl shadow-xl p-4"
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent bg-black text-white flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">
          {title}
        </h4>
        <p className="text-neutral-300">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a
      {...rest}
      className="text-neutral-300 hover:text-white"
    >
      {children}
    </a>
  );
};