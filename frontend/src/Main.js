import { useEffect, useRef, useState } from "react";
import { useFonts } from "./context/fonts";
import { asyncFiglet } from './helper';
import { parseFont } from 'figlet';

const DEFAULT_TXT = 'hello'

const Main = () => {
    const { fonts, fontsLoaded } = useFonts();
    const [figletObjects, setFigletObjects] = useState([]);
    const userInput = useRef();

    useEffect(() => {
        if (fontsLoaded) {
            getFiglets(DEFAULT_TXT);
        }
    }, [fontsLoaded])

    const getFiglets = async (initialTxt) => {
        const _figletObjects = await Promise.all(fonts.map(async (fontname) => {
            const font = await import(`figlet/importable-fonts/${fontname}`);
            parseFont(fontname, font.default)
            const txt = await asyncFiglet(initialTxt, { font: fontname, whitespaceBreak: true });
            return {fontname: fontname, txt: txt};
        }))
        setFigletObjects(_figletObjects);
    }

    const printFiglet = (figletTxt) => {
        const figletLines = figletTxt.split('\n');
        return (
            <pre className="text-base text-center font-bold">
                {figletLines.map((line) => {
                    return (
                        <>{line}<br/></>
                    )
                })}
            </pre>
        )
    }

    const updateFiglets = () => {
        const initialTxt = userInput.current.value
        if (initialTxt.length > 0) {
            getFiglets(initialTxt);
        }
    }

    const handleOnKeyDown = (e) => {
        // Detect ENTER key
        if (e.keyCode === 13) {
            updateFiglets();
        }
    }

    return (
        <main className="bg-slate-100 py-6 grow border-0 border-t-4 border-slate-200 border-solid">
            <div className="container mx-auto h-full">
                <div className="w-full mx-auto h-full">

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
                            className="absolute inset-y-0 right-0 flex items-center px-4 bg-sky-600 hover:bg-sky-500 rounded-r-lg fill-gray-200 hover:fill-white transition-colors duration-300"
                            onClick={updateFiglets}
                        >
                            <svg className="h-5 w-5 fill-inherit transition-colors duration-300" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </label>

                    {/* Figlets */}
                    {fontsLoaded && figletObjects.map((figletObj) => {
                        return (
                            <>
                                <h3>{figletObj.fontname}</h3>
                                <div className="block rounded-lg shadow-lg bg-white w-full mb-8 py-6">
                                    {printFiglet(figletObj.txt)}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Main;