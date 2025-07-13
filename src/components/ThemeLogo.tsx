'use client';

import { Logo } from "@once-ui-system/core";
import { useTheme } from '@once-ui-system/core';

export default function ThemeLogo() {
  const { theme } = useTheme();
  
  return (
    <Logo 
      icon={theme === 'light' ? "/trademarks/wordmark-light.svg" : "/trademarks/wordmark-dark.svg"} 
      style={{ display: "inline-flex", top: "0.5em", left: "0.1em" }}
    />
  );
}