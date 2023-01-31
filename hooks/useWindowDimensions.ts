import { useState, useEffect } from "react";

const isBrowser = () => typeof window !== "undefined";

function getWindowDimensions() {
  if (!isBrowser()) {
    const width = 1280;
    const height = 900;

    return { width, height };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
