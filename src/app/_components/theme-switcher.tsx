"use client";

import styles from "./switch.module.css";
import {  useEffect, useState } from "react";

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial mode from localStorage
    const savedMode = localStorage.getItem(STORAGE_KEY) as ColorSchemePreference;
    if (savedMode && modes.includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(STORAGE_KEY, mode);
    updateTheme(mode);
  }, [mode, mounted]);

  useEffect(() => {
    // Sync the tabs
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === STORAGE_KEY && e.newValue && modes.includes(e.newValue as ColorSchemePreference)) {
        setMode(e.newValue as ColorSchemePreference);
      }
    };

    addEventListener("storage", handleStorageChange);
    return () => removeEventListener("storage", handleStorageChange);
  }, []);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={styles.switch} />;
  }

  return (
    <button
      className={styles.switch}
      onClick={handleModeSwitch}
      aria-label={`Switch to ${modes[(modes.indexOf(mode) + 1) % modes.length]} mode`}
    />
  );
};

/**
 * Function to update theme without FOUC
 */
const updateTheme = (mode: ColorSchemePreference) => {
  const SYSTEM = "system";
  const DARK = "dark";
  const LIGHT = "light";

  // Temporarily disable transitions
  const style = document.createElement("style");
  style.textContent = "*,*:after,*:before{transition:none !important;}";
  document.head.appendChild(style);

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);
  const systemMode = media.matches ? DARK : LIGHT;
  const resolvedMode = mode === SYSTEM ? systemMode : mode;
  
  const classList = document.documentElement.classList;
  if (resolvedMode === DARK) {
    classList.add(DARK);
  } else {
    classList.remove(DARK);
  }
  
  document.documentElement.setAttribute("data-mode", mode);

  // Re-enable transitions
  getComputedStyle(document.body);
  setTimeout(() => {
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }, 1);
};

/**
 * This component which applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return <Switch />;
};
