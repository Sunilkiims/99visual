"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollDownButton() {
  const [visible, setVisible] = useState(true);

  // Hide button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={scrollDown}
          className="
            flex flex-col items-center gap-1
            text-white
            animate-bounce
          "
        >
          <span className="text-sm opacity-70"></span>

          <div className="
            w-10 h-10
            rounded-full
            border border-white
            flex items-center justify-center
            hover:bg-white hover:text-black
            transition
          ">
            <ChevronDown size={20} />
          </div>
        </button>
      </div>
    )
  );
}