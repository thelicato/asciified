"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IApiFonts } from "./types";

interface ProviderInterface {
  fonts: string[];
  fontsLoaded: boolean;
}

const FontsContext = createContext<ProviderInterface | null>(null);

const FontsProvider = ({ children }: any): any => {
  const [fonts, setFonts] = useState<string[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getFonts = async () => {
      const response = await fetch("/api/v2/fonts");
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = (await response.json()) as IApiFonts;

      // There are problem with the 'Fraktur' font when converting to image
      setFonts(() => data.fonts.splice(data.fonts.indexOf("Fraktur")));
      setFontsLoaded(true);
    };

    getFonts();
  }, []);

  return (
    <FontsContext.Provider value={{ fonts: fonts, fontsLoaded: fontsLoaded }}>
      {children}
    </FontsContext.Provider>
  );
};

const useFonts = () => {
  const context = useContext(FontsContext);
  if (!context) {
    throw new Error("useFonts must be used within FontsProvider.");
  }
  return context;
};

export { FontsProvider, useFonts };
