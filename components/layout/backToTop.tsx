"use client";

import { useEffect, useState } from "react";
import { useScroll } from "./ScrollContext";
import { motion } from "framer-motion";

export const BackToTop = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // console.log("scrollY/window.innerHeight:", scrollY/window.innerHeight);
    // setIsVisible(scrollY > window.innerHeight * 0.4)
    setIsVisible(scrollY > 500)
  }, [scrollY]);
  const isView = ()=> isVisible
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed z-50 bottom-0 w-[108px] h-[150px] bg-[url('/back-to-top.png?v=1')] bg-no-repeat bg-[length:108px_450px] opacity-60 cursor-pointer hover:opacity-100 hover:bg-[position:0_-150px]"
      onClick={scrollToTop}
      initial={{ right: "-108px", opacity: 0.6 }} // 初始状态
      animate={{
        right: isView() ? "0px" : "-108px", // 动态控制位置
        opacity: isVisible ? 0.3 : 0, // 动态控制透明度
      }}
      transition={{
        right: { duration: 0.8 }, // 位置动画持续时间
        opacity: { duration: 0.3 }, // 透明度动画持续时间
      }}
    />
  );
};