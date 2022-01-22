import { createContext, useContext, useEffect, useState } from "react"

const FontsContext = createContext(null);

const FontsProvider = ({children}) => {
    const [fonts, setFonts] = useState([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const getFonts = async () => {
            const response = await fetch('/api/fonts');
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            let _fonts = await response.json();
            // There are problem with the 'Fraktur' font when converting to image
            _fonts.splice(_fonts.indexOf('Fraktur'))
            // Set state
            setFonts(_fonts);
            setFontsLoaded(true);
        }

        getFonts();
    }, [])

    return (
        <FontsContext.Provider value={{fonts: fonts, fontsLoaded: fontsLoaded}}>
            {children}
        </FontsContext.Provider>
    )
}

const useFonts = () => {
    const context = useContext(FontsContext);
    if (!context) {
        throw new Error("useFonts must be used within FontsProvider.");
    }
    return context;
}

export { FontsProvider, useFonts };