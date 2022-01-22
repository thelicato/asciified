import { useEffect, useRef, useState } from "react";
import { useFonts } from "./context/fonts";
import { asyncFiglet, makeImage } from './helper';
import { parseFont } from 'figlet';

const DEFAULT_TXT = 'hello'

const Main = () => {
    const { fonts, fontsLoaded } = useFonts();
    const [isLoading, setIsLoading] = useState(true);
    const [figletObjects, setFigletObjects] = useState([]);
    const userInput = useRef();

    useEffect(() => {
        if (fontsLoaded) {
            getFiglets(DEFAULT_TXT);
        }
    }, [fontsLoaded])

    useEffect(() => {
        if (!isLoading && fontsLoaded) {
            getFigletImages()
        }
    }, [isLoading, fontsLoaded, fonts])

    const getFiglets = async (initialTxt) => {
        const _figletObjects = await Promise.all(fonts.map(async (fontname) => {
            const font = await import(`figlet/importable-fonts/${fontname}`);
            parseFont(fontname, font.default)
            const txt = await asyncFiglet(initialTxt, { font: fontname, whitespaceBreak: true });
            return {fontname: fontname, txt: txt, png: null};
        }))
        setFigletObjects(_figletObjects);
        setIsLoading(false);
    }

    const getFigletImages = async () => {
        const figletContainerWidth = document.getElementById('figlet-container').offsetWidth
        const _figletObjects = await Promise.all(figletObjects.map(async (figletObj) => {
            const key = figletObj.fontname.toLowerCase().replaceAll(' ', '');
            const ref = document.getElementById(key)
            try {
                const _png = await makeImage(ref, figletContainerWidth);
                return {...figletObj, png: _png}
            }
            catch (e) {
                console.error(e)
                return figletObj
            }
        }))

        setFigletObjects(_figletObjects);        
    }

    const printFiglet = (figletTxt, key) => {
        const figletLines = figletTxt.split('\n');
        return (
            <pre id={key} className="text-base text-center font-bold inline">
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
            setIsLoading(true);
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
            <div id="figlet-container" className="container mx-auto h-full">
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
                            
                            <svg className="h-5 w-5 fill-inherit transition-colors duration-300" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19.5 12.473c0-1.948-.618-3.397-2.066-4.844-.391-.39-1.023-.39-1.414 0-.391.391-.391 1.024 0 1.415 1.079 1.078 1.48 2.007 1.48 3.429 0 1.469-.572 2.85-1.611 3.888-1.004 1.003-2.078 1.502-3.428 1.593l1.246-1.247c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.337-1.336c1.923-.082 3.542-.792 4.933-2.181 1.417-1.416 2.197-3.299 2.197-5.303zM6.5 12.5c0-1.469.572-2.85 1.611-3.889 1.009-1.009 2.092-1.508 3.457-1.594l-1.275 1.275c-.391.391-.391 1.023 0 1.414.195.196.451.294.707.294s.512-.098.707-.293l3.707-3.707-3.707-3.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.311 1.311c-1.914.086-3.525.796-4.907 2.179-1.417 1.416-2.197 3.299-2.197 5.303 0 1.948.618 3.397 2.066 4.844.195.195.451.292.707.292s.512-.098.707-.293c.391-.391.391-1.024 0-1.415-1.079-1.077-1.48-2.006-1.48-3.428z"/>
                            </svg>
                        </button>
                    </label>


                    {/* Figlets */}
                    {fontsLoaded && figletObjects.map((figletObj) => {
                        const key = figletObj.fontname.toLowerCase().replaceAll(' ','');
                        return (
                            <div key={key}>
                                <h3>{figletObj.fontname}</h3>
                                <div className="flex justify-center rounded-lg shadow-lg bg-white w-full mb-8 py-6">
                                    {figletObj.png !== null ? (
                                        <div className="w-11/12 text-center">
                                            <p className="mb-4">The Figlet was to long and was converted into an image. You can copy it anyway</p>
                                            <img src={figletObj.png} alt={`${figletObj.txt}-${key}`}/>
                                        </div>
                                    ) : (
                                        <>{printFiglet(figletObj.txt, key)}</>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Main;