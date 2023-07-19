"use client";

import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { parseFont } from "figlet";
import { useFonts } from "@asciified/app/fonts";
import { IFigletObject } from "@asciified/app/types";
import { asyncFiglet, makeImage } from "@asciified/app/helpers";
import {
  FigletClipboard,
  ImgClipboard,
  Loading,
} from "@asciified/app/components";

const DEFAULT_TXT = "hello";

export default function Home() {
  const { fonts, fontsLoaded } = useFonts();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [figletObjects, setFigletObjects] = useState<IFigletObject[]>([]);
  const userInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fontsLoaded) {
      getFiglets(DEFAULT_TXT);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isLoading && fontsLoaded) {
      getFigletImages();
    }
  }, [isLoading, fontsLoaded, fonts]);

  const getFiglets = async (initialTxt: string) => {
    const _figletObjects = await Promise.all(
      fonts.map(async (fontName: string) => {
        const font = await import(`figlet/importable-fonts/${fontName}.js`);
        parseFont(fontName, font.default);
        const txt = await asyncFiglet(initialTxt, {
          font: fontName as figlet.Fonts,
        });
        return { fontName: fontName, txt: txt, png: null };
      })
    );
    setFigletObjects(_figletObjects);
    setIsLoading(false);
  };

  const getFigletImages = async () => {
    const figletContainerWidth = (
      document.getElementById("figlet-container") as HTMLElement
    ).offsetWidth;
    const _figletObjects = await Promise.all(
      figletObjects.map(async (figletObj) => {
        const key = figletObj.fontName.toLowerCase().replaceAll(" ", "");
        const ref = document.getElementById(key);
        try {
          const _png = await makeImage(
            ref as HTMLElement,
            figletContainerWidth
          );
          return { ...figletObj, png: _png };
        } catch (e) {
          console.error(e);
          return figletObj;
        }
      })
    );

    setFigletObjects(_figletObjects);
  };

  const updateFiglets = () => {
    if (!userInput.current) {
      return;
    }
    const initialTxt = userInput.current.value;
    if (initialTxt.length > 0) {
      setIsLoading(true);
      getFiglets(initialTxt);
    }
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // Detect ENTER key
    if (e.key === "Enter") {
      e.preventDefault();
      updateFiglets();
    }
  };

  return (
    <>
      {/* New */}
      <main className="bg-slate-100 py-6 grow border-0 border-t-4 border-slate-200 border-solid">
        <div className="container mx-auto h-full px-6">
          <div
            id="figlet-container"
            className="w-4/5 md:w-full mx-auto h-full flex flex-col"
          >
            {/* Brief description */}
            <div>
              <p className="text-justify">
                <b>asciified</b> is a small webapp that gives you the ability to
                create <b>figlets</b> using the{" "}
                <a
                  href="https://www.npmjs.com/package/figlet"
                  target="_blank"
                  rel="noreferrer"
                >
                  figlet
                </a>{" "}
                package. You can either use this webapp and copy the figlet you
                like or you can also use the API I exposed for you. Make HTTP
                GET requests to <code className="inline">/api/v2</code> and set
                the text parameter.
                <br />
                <b>Example</b>:{" "}
              </p>
              <pre className="inline">/api/v2/ascii?text=ASCII+art</pre>{" "}
              <p>
                Optionally you can set the font parameter to specify the output
                font (the available fonts are the ones you see in this page).{" "}
                <br />
                <b>Example</b>:{" "}
              </p>
              <pre className="inline">
                /api/v2/ascii??text=ASCII+art&font=Trek
              </pre>
            </div>

            {/* Input text */}
            <h2 className="text-center">Have some fun...</h2>
            <label className="relative block my-6">
              <span className="sr-only">Search</span>

              <input
                className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-4 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Type something and press the button..."
                type="text"
                name="type"
                ref={userInput}
                onKeyDown={handleOnKeyDown}
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-400 rounded-r-lg fill-gray-200 hover:fill-white transition-colors duration-300"
                onClick={updateFiglets}
              >
                <svg
                  className="h-5 w-5 fill-inherit transition-colors duration-300"
                  version="1.2"
                  baseProfile="tiny"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5 12.473c0-1.948-.618-3.397-2.066-4.844-.391-.39-1.023-.39-1.414 0-.391.391-.391 1.024 0 1.415 1.079 1.078 1.48 2.007 1.48 3.429 0 1.469-.572 2.85-1.611 3.888-1.004 1.003-2.078 1.502-3.428 1.593l1.246-1.247c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.337-1.336c1.923-.082 3.542-.792 4.933-2.181 1.417-1.416 2.197-3.299 2.197-5.303zM6.5 12.5c0-1.469.572-2.85 1.611-3.889 1.009-1.009 2.092-1.508 3.457-1.594l-1.275 1.275c-.391.391-.391 1.023 0 1.414.195.196.451.294.707.294s.512-.098.707-.293l3.707-3.707-3.707-3.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.311 1.311c-1.914.086-3.525.796-4.907 2.179-1.417 1.416-2.197 3.299-2.197 5.303 0 1.948.618 3.397 2.066 4.844.195.195.451.292.707.292s.512-.098.707-.293c.391-.391.391-1.024 0-1.415-1.079-1.077-1.48-2.006-1.48-3.428z" />
                </svg>
              </button>
            </label>
            {/* Figlets */}
            {fontsLoaded ? (
              figletObjects.map((figletObj) => {
                const key = figletObj.fontName
                  .toLowerCase()
                  .replaceAll(" ", "");
                return (
                  <div key={key}>
                    <h3>{figletObj.fontName}</h3>
                    <div className="flex justify-center rounded-lg shadow-lg bg-white w-full mb-8 py-3">
                      {figletObj.png !== null ? (
                        <>
                          <ImgClipboard
                            fontName={key}
                            figletTxt={figletObj.txt}
                            png={figletObj.png}
                          />
                        </>
                      ) : (
                        <>
                          <FigletClipboard id={key} figletTxt={figletObj.txt} />
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
